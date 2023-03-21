/* eslint-disable import/prefer-default-export */
export abstract class ApiRenderEngine {
	abstract render(template: string, data: object): Promise<string>;
}
