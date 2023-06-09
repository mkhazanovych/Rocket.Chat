import { Base } from '../../../../../app/models/server';
/**
 * Livechat Unit Monitors model
 */
class LivechatUnitMonitors extends Base {
	constructor() {
		super('livechat_unit_monitors');

		this.tryEnsureIndex({ monitorId: 1 });
		this.tryEnsureIndex({ unitId: 1 });
	}

	findByUnitId(unitId) {
		return this.find({ unitId });
	}

	findByMonitorId(monitorId) {
		return this.find({ monitorId });
	}

	saveMonitor(monitor) {
		return this.upsert(
			{
				monitorId: monitor.monitorId,
				unitId: monitor.unitId,
			},
			{
				$set: {
					username: monitor.username,
				},
			},
		);
	}

	removeByUnitIdAndMonitorId(unitId, monitorId) {
		this.remove({ unitId, monitorId });
	}

	removeByUnitId(unitId) {
		this.remove({ unitId });
	}

	removeByMonitorId(monitorId) {
		this.remove({ monitorId });
	}
}

export default new LivechatUnitMonitors();
