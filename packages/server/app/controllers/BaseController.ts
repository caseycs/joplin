import { User } from '../db';
import { Models } from '../models/factory';
import { ErrorForbidden } from '../utils/errors';

export default abstract class BaseController {

	private models_: Models;

	constructor(models: Models) {
		this.models_ = models;
	}

	protected get models(): Models {
		return this.models_;
	}

	async initSession(sessionId: string, mustBeAdmin: boolean = false): Promise<User> {
		const user: User = await this.models.session().sessionUser(sessionId);
		if (!user) throw new ErrorForbidden(`Invalid session ID: ${sessionId}`);
		if (!user.is_admin && mustBeAdmin) throw new ErrorForbidden('Non-admin user is not allowed');
		return user;
	}

}
