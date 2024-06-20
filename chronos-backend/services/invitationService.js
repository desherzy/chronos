const CalendarDto = require('../dtos/CalendatDto');
const Calendar = require('../models/Calendar');
const Invitation = require('../models/Invitation');
const User = require('../models/User');
const UserCalendar = require('../models/UserCalendar');

class InvitationService {

    async getIngoingInvitation(userId) {
        try {
            const invitations = await Invitation.findAll({  
                where: {
                    invited_user_id: userId,
                    accepted: null
                }
            });

            const processedInvitations = [];
    
            for (const invitation of invitations) {

                const inviter = await User.findOne({
                    where: { id: invitation.inviter_user_id },
                    attributes: ['profile_image', 'login']
                });
    
                const calendar = await Calendar.findOne({
                    where: { id: invitation.calendar_id },
                    attributes: ['name']
                });

                processedInvitations.push({
                    invitationId: invitation.id,
                    inviterAvatar: inviter ? inviter.profile_image : null,
                    inviterLogin: inviter ? inviter.login : null,
                    calendarName: calendar ? calendar.name : null
                });
            }
    
            return processedInvitations;
        } catch (error) {
            console.error('Error retrieving ingoing invitations:', error);
            throw error;
        }
    }

    async getOutgoingInvitation(userId) {
        const invitations = await Invitation.findAll({
            where: {
                inviter_user_id: userId
            }
        });
        return invitations;
    }

    async create(inviterUserId, invitedUserEmail, permissionId, calendarId) {
        const user = await User.findOne({where: {email: invitedUserEmail}})
        if(!user) {
            throw ApiError.badRequest('Invited user is not found');
        }
        const newInvitation = await Invitation.create({
            inviter_user_id: inviterUserId,
            invited_user_id: user.id,
            permission_id: permissionId,
            calendar_id: calendarId
        });
        return newInvitation;
    }

    async accept(invitationId) {
        const invitation = await Invitation.findByPk(invitationId);
        if (!invitation) {
            throw ApiError.badRequest('Invitation is not found');
        }

        await UserCalendar.create({
            user_id: invitation.invited_user_id,
            calendar_id: invitation.calendar_id,
            permission_id: invitation.permission_id
        });

        invitation.accepted = true;
        await invitation.save();

        const calendar = await Calendar.findByPk(invitation.calendar_id);
        if (!calendar) {
            throw ApiError.badRequest('Calendar is not found');
        }

        const calendarDto = new CalendarDto(calendar, invitation.permission_id);
        return calendarDto;
    }

    async decline(userId, invitationId) {
        const invitation = await Invitation.findByPk(invitationId);
        if (!invitation) {
            throw ApiError.badRequest('Invitation is not found');
        }

        invitation.accepted = false;
        await invitation.save();
    }

    async delete(invitationId) {
        const invitation = await Invitation.findByPk(invitationId);
        if (!invitation) {
            throw ApiError.badRequest('Invitation is not found');
        }

        await invitation.destroy();
    }

}

module.exports = new InvitationService();