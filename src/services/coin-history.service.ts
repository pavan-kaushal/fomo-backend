import * as cron from 'node-cron';
import environmentConfig from '../environment.config';
import { fetchCoinDataFromSource } from './coin.service';
import socket from '../socket';
import { Types } from 'mongoose';
import { CoinHistory } from '../models/coin-history.model';

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

export const coinHistory  = async (coin: Types.ObjectId) => {
    const data = await CoinHistory.aggregate([
        {
            $match: {
                coin,
            }
        }, {
            $limit: environmentConfig.numberOfRecords
        }, {
            $sort: {
                _id: -1
            }
        }
    ])
    return data.map((doc, i) => {
      return {
        ...doc,
        change: i>0 ? ((doc[i].price - doc[i-1].price)/(doc[i-1].price || doc[i].price))*100 : 0
      }
    })
}