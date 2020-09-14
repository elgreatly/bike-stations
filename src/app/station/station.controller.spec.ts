import { HttpException, HttpStatus } from '@nestjs/common';
import { SnapshotModel } from './models/snapshot.model';
import { StationController } from './station.controller';

describe('StationController Tests', () => {
  let stationController: StationController;

  const stationService: any  = {
    takeSnapshot: () => null,
    getStationByIdInSnapshot: (stationId: number, date: Date) => {
        if (date === new Date('2020-09-15T07:22:50')) { return null; }
        if (stationId !== 3004) {
            return new SnapshotModel({
                id: '5f59b829801b473fc44e52dc',
                stations: [],
                createdAt: '2020-09-10T05:22:49.278+00:00',
            });
        }
        return new SnapshotModel({
                id: '5f59b829801b473fc44e52dc',
                stations: [{
                    id: 3004,
                    name: 'Municipal Services Building Plaza',
                    coordinates: [-75.16374, 39.95378],
                    totalDocks: 30,
                    docksAvailable: 20,
                    bikesAvailable: 9,
                    classicBikesAvailable: 8,
                    smartBikesAvailable: 0,
                    electricBikesAvailable: 1,
                    rewardBikesAvailable: 9,
                    rewardDocksAvailable: 20,
                    kioskStatus: 'FullService',
                    kioskPublicStatus: 'Active',
                    kioskConnectionStatus: 'Active',
                    kioskType: 1,
                    addressStreet: '1401 John F. Kennedy Blvd.',
                    addressCity: 'Philadelphia',
                    addressState: 'PA',
                    addressZipCode: '19102',
                    bikes: [],
                    closeTime: null,
                    eventEnd: null,
                    eventStart: null,
                    isEventBased: false,
                    isVirtual: false,
                    kioskId: 3004,
                    notes: null,
                    openTime: null,
                    publicText: '',
                    timeZone: null,
                    trikesAvailable: 0,
                    latitude: 39.95378,
                    longitude: -75.16374,
                }],
                createdAt: '2020-09-10T05:22:49.278+00:00',
            });
    },
    getStationsSnapshot: (date: Date) => {
        if (date === new Date('2020-09-15T07:22:50')) { return null; }
        return new SnapshotModel({
            id: '5f59b829801b473fc44e52dc',
            stations: [{
                id: 3004,
                name: 'Municipal Services Building Plaza',
                coordinates: [-75.16374, 39.95378],
                totalDocks: 30,
                docksAvailable: 20,
                bikesAvailable: 9,
                classicBikesAvailable: 8,
                smartBikesAvailable: 0,
                electricBikesAvailable: 1,
                rewardBikesAvailable: 9,
                rewardDocksAvailable: 20,
                kioskStatus: 'FullService',
                kioskPublicStatus: 'Active',
                kioskConnectionStatus: 'Active',
                kioskType: 1,
                addressStreet: '1401 John F. Kennedy Blvd.',
                addressCity: 'Philadelphia',
                addressState: 'PA',
                addressZipCode: '19102',
                bikes: [],
                closeTime: null,
                eventEnd: null,
                eventStart: null,
                isEventBased: false,
                isVirtual: false,
                kioskId: 3004,
                notes: null,
                openTime: null,
                publicText: '',
                timeZone: null,
                trikesAvailable: 0,
                latitude: 39.95378,
                longitude: -75.16374,
            }],
            createdAt: '2020-09-10T05:22:49.278+00:00',
        });
    },
  };

  const weatherService: any = {
    getWeatherByCityName: (cityName: string) => {
      return {
          weather: [
            {
                id: 804,
                main: 'Clouds',
                description: 'overcast clouds',
                icon: '04n',
            },
          ],
      };
    },
  };

  beforeEach(async () => {
    stationController = new StationController(stationService, weatherService);
  });

  it('StationController should be defined', () => {
    expect(stationController).toBeDefined();
  });

  it('should throw NotFoundException if there is no snapshots', async () => {
    const at = new Date('2020-09-15T07:22:50');
    try {
      await stationController.getStationsSnapshot(at);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('No Snapshot Found');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('should return stations, snapshot date and weather if snapshot exist', async () => {
    const at = new Date('2020-09-10T05:22:40');

    const expectedStationId = 3004;
    const expectedWeatherId = 804;
    const expectedSnapshotDate = '2020-09-10T07:22:49';

    const snapshot = await stationController.getStationsSnapshot(at);

    expect(snapshot.at).toBe(expectedSnapshotDate);
    expect(snapshot.stations[0].id).toBe(expectedStationId);
    expect(snapshot.weather.weather[0].id).toBe(expectedWeatherId);
  });

  it('should throw NotFoundException if there is no snapshots when search for specific station id', async () => {
    const at = new Date('2020-09-15T07:22:50');
    const stationId = 3004;
    try {
      await stationController.getStationByIdInSnapshot(stationId, at);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('No Snapshot Found');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('should throw NotFoundException if there is no stations in the snapshot when search for specific station id', async () => {
    const at = new Date('2020-09-10T07:22:50');
    const stationId = 3005;
    try {
      await stationController.getStationByIdInSnapshot(stationId, at);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('3005 ID Station Not Found');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('should return station, snapshot date and weather if snapshot and station id exist', async () => {
    const at = new Date('2020-09-10T07:22:50');
    const stationId = 3004;

    const expectedStationId = 3004;
    const expectedWeatherId = 804;
    const expectedSnapshotDate = '2020-09-10T07:22:49';

    const snapshot = await stationController.getStationByIdInSnapshot(stationId, at);

    expect(snapshot.at).toBe(expectedSnapshotDate);
    expect(snapshot.station.id).toBe(expectedStationId);
    expect(snapshot.weather.weather[0].id).toBe(expectedWeatherId);
  });

});
