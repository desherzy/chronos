const calendarService = require("../services/calendarService");
const invitationService = require('../services/invitationService');


class InvitationController {

    async create(req, res, next) {
        try {
            const userId = req.user.id;
            const { invitedUserEmail, calendarId, permissionId } = req.body;

            await calendarService.checkPermissions(userId, calendarId);
            const invite = await invitationService.create(userId, invitedUserEmail, permissionId, calendarId);
            res.json(invite);
        } catch (e) {
            next(e);
        }
    }

    async accept(req, res, next) {
        try {
            const { invitationId } = req.body;
            
            const calendar = await invitationService.accept(invitationId);
            res.json(calendar);
        } catch (e) {
            next(e);
        }
    }

    async decline(req, res, next) {
        try {
            const userId = req.user.id;
            const { invitationId } = req.body;

            await invitationService.decline(userId, invitationId);
            res.status(200).json({ message: 'Invitation is declined' });
        } catch (e) {
            next(e);
        }
    }

    async getIngoingInvitation(req, res, next) {
        try {
            const userId = req.user.id;

            const invitations = await invitationService.getIngoingInvitation(userId);
            res.json(invitations);
        } catch (e) {
            next(e);
        }
    }

    async getOutgoingInvitation(req, res, next) {
        try {
            const userId = req.user.id;

            const invitations = await invitationService.getOutgoingInvitation(userId);
            res.json(invitations);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.user.id;
            const { invitationId } = req.body;

           // await calendarService.checkPermissions(userId, calendarId);
            await invitationService.delete(invitationId);
            res.status(200).json({ message: 'Invitation is successfully removed' });
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new InvitationController();