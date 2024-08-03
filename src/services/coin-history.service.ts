import * as cron from 'node-cron';
import environmentConfig from '../environment.config';
import { fetchCoinDataFromSource } from './coin.service';
import socket from '../socket';

export const scheduleCronToFetchCoinDataFromSource = () => {
    cron.schedule(environmentConfig.COIN_PRICE_CRON_CONFIG, async () => {
        console.log('Starting Cron for Fetching Coin Price');
        await fetchCoinDataFromSource();
        console.log("Coin prices updated")
        socket.emitData('priceUpdates', null)
    }, {
        timezone: environmentConfig.timezone
    });
}