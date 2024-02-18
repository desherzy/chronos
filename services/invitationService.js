const CalendarDto = require('../dtos/CalendatDto');
const Calendar = require('../models/Calendar');
const Invitation = require('../models/Invitation');
const UserCalendar = require('../models/UserCalendar');

class InvitationService {

    async getIngoingInvitation(userId) {
        const invitations = await Invitation.findAll({
            where: {
                invited_user_id: userId
            }
        });
        return invitations;
    }

    async getOutgoingInvitation(userId) {
        const invitations = await Invitation.findAll({
            where: {
                inviter_user_id: userId
            }
        });
        return invitations;
    }

    async create(inviterUserId, invitedUserId, permissionId, calendarId) {
        const newInvitation = await Invitation.create({
            inviter_user_id: inviterUserId,
            invited_user_id: invitedUserId,
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