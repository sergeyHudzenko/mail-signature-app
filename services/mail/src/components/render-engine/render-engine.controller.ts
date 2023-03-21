import { ApiRenderEngine } from '../../abstractions/ApiRenderEngine';

export default class RenderEngine extends ApiRenderEngine {
    private template: string;

	constructor(template) {
        super();
		this.template = template;
	}

	async render(user) {
		let html = this.template;
		html = await html.replace('{{fullName}}', user.fullName);
		html = await html.replace('{{title}}', user.title);
		html = await html.replace('{{company}}', user.company);
		html = await html.replace('{{email}}', user.email);
		html = await html.replace('{{phone}}', user.phone);
		html = await html.replace('{{address}}', user.address);

		return html;
	}
}
