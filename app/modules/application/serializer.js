import PharbersSerializer from 'pharbers-emberbasis-library/serializers/phserializer';
import { dasherize } from '@ember/string';

/**
 * 所有的Serializer都要继承phserializer
 * 数据有特殊需求直接在normalizeResponse自己修改
 * @type {String}
 */

export default PharbersSerializer.extend({
	keyForAttribute(key) {
		return key
	},
	keyForRelationship(key) {
		return key
	},
	payloadKeyFromModelName(modelName) {
		return modelName
	},
	modelNameFromPayloadKey(modelName) {
		return dasherize(modelName);
	},
});
