/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type SpeedcontrolPlayerArray = {
	name: string;
	id: string;
	teamID: string;
	country?: string;
	social: {
		twitch?: string;
	};
	customData: {
		[k: string]: string;
	};
	[k: string]: any;
}[];
