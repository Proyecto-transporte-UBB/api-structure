import { NextFunction, Request, Response } from "express";

export type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type ModelFunction<INPUT, OUTPUT> = (input: INPUT) => Promise<OUTPUT>;

export interface Controller {
    getMany?: ControllerFunction;
    getOne?: ControllerFunction;
    create?: ControllerFunction;
    update?: ControllerFunction;
    delete?: ControllerFunction;
}

export type Query = Partial<{
    token: string;
    source: string;
    dates: [Date, Date];
    positions: [Position | undefined, Position | undefined];
}>;

export type QueryWithPlaces = Query & Partial<{
    stat: string;
    city: string;
}>;

export interface WazeRouteModel {
    getMany?: ModelFunction<Query, WazeRouteGroup>;
    getOne?: ModelFunction<{
        id: number;
    }, WazeRoute>;
}

export interface AlertModel {
    getMany?: ModelFunction<QueryWithPlaces & Partial<{
        type: string;
        subtype: string;
        kms: [number | undefined, number | undefined];
        fines: [number | undefined, number | undefined];
        sector: string;
        tribunal: string;
        completeReport: boolean;
        trafficIncident: boolean;
        reliabilities: [number | undefined, number | undefined];
        lengths: [number | undefined, number | undefined];
        delays: [number | undefined, number | undefined];
        dir: string;
    }>, AlertGroup>;
    getOne?: ModelFunction<{
        id: number;
    }, Alert>;
}

export interface SpeedModel {
    getMany?: ModelFunction<QueryWithPlaces & Partial<{
        speeds: [number | undefined, number | undefined];
        fixes: [number | undefined, number | undefined];
        precisions: [number | undefined, number | undefined];
        folder: string;
        route: string;
        vehicleType: string;
        vehiclePlate: string;
        direction: number;
        dop: [number | undefined, number | undefined];
        dir: string;
    }>, SpeedGroup>;
    getOne?: ModelFunction<{
        id: number;
    }, Speed>;
}

export interface CameraModel {
    getMany?: ModelFunction<Omit<QueryWithPlaces, "dates"> & Partial<{
        integrations: [Date | undefined, Date | undefined];
        online: boolean;
        link: string;
        provider: string;
        model: string;
        brand: string;
        encoderModel: string;
        encoderBrand: string;
    }>, CameraGroup>;
    getOne?: ModelFunction<{
        id: number;
    }, Camera>;
}

export interface IdName {
    id: number;
    name?: string;
}

export interface Position {
    latitude: number;
    longitude: number;
}

export interface City extends IdName {
    state: IdName;
}

export interface Street extends IdName {
    city: City;
}

export interface WazePoint extends Position {
    id: number;
    index: number;
}

export interface WazeRoute {
    id: number;
    source: IdName;
    date: Date;
    historicTime: number;
    from: Street;
    name: IdName;
    to: Street;
    length: number;
    time: number;
    jamLevel: number;
    type: IdName;
    points: WazePoint[];
}

export interface AlertSubtype extends IdName {
    type: IdName;
}

export interface Injury {
    level: IdName;
    place: IdName;
}

export interface Alert extends Partial<Position> {
    id: number;
    source: IdName;
    date: Date;
    city?: City;
    subtype?: AlertSubtype;
    cause?: IdName;
    km?: number;
    fine?: number;
    sector?: IdName;
    tribunal?: IdName;
    completeReport?: boolean;
    trafficIncident?: boolean;
    reliability?: number;
    length?: number;
    delay?: number;
    dir?: IdName;
    wazeRoute?: WazeRoute;
    injuries?: Injury[];
}

export interface Route extends IdName {
    folder: IdName;
}

export interface Vehicle extends IdName {
    plate: string;
}

export interface Speed extends Position {
    id: number;
    source: IdName;
    date: Date;
    speed: number;
    fix?: number;
    precision?: number;
    city?: City;
    route?: Route;
    vehicle?: Vehicle;
    direction?: number;
    dop?: number;
    comment?: string;
    dir?: IdName;
}

export interface Model extends IdName {
    brand: IdName;
}

export interface Camera extends IdName, Position {
    source: IdName;
    city: City;
    integration: Date;
    online: boolean;
    link: IdName;
    provider: IdName;
    camId: string;
    encoderId?: string;
    model: Model;
    encoderModel?: Model;
}

export interface Stats<T> {
    count: number;
    min: T;
    mean: T;
    logMean: T;
    median: T;
    max: T;
    stdDev: T;
    logStdDev: T;
    NAs: number;
}

export interface CatStats<T> {
    total: number;
    categories: [T, number][];
    NAs: number;
}

export interface PositionGroup {
    latitude: Stats<number>;
    longitude: Stats<number>;
}

export interface WazeRouteGroup extends PositionGroup {
    source: CatStats<IdName>;
    date: Stats<Date>;
    historicTime: Stats<number>;
    from: CatStats<Street>;
    name: CatStats<IdName>;
    to: CatStats<Street>;
    length: Stats<number>;
    time: Stats<number>;
    jamLevel: Stats<number>;
    type: CatStats<IdName>;
    discretizedWazeRoutes?: Omit<WazeRouteGroup, "discretizedWazeRoutes">[];
    wazeRoutes?: WazeRoute[];
}

export interface AlertGroup extends PositionGroup {
    source: CatStats<IdName>;
    date: Stats<Date>;
    city: CatStats<City>;
    state: CatStats<IdName>;
    subtype: CatStats<AlertSubtype>;
    type: CatStats<IdName>;
    cause: CatStats<IdName>;
    km: Stats<number>;
    fine: Stats<number>;
    sector: CatStats<IdName>;
    tribunal: CatStats<IdName>;
    completeReport: CatStats<boolean>;
    trafficIncident: CatStats<boolean>;
    reliability: Stats<number>;
    length: Stats<number>;
    delay: Stats<number>;
    dir: CatStats<IdName>;
    discretizedAlerts?: Omit<AlertGroup, "discretizedAlerts">[];
    alerts?: Alert[];
}

export interface SpeedGroup extends PositionGroup {
    source: CatStats<IdName>;
    date: Stats<Date>;
    speed: Stats<number>;
    fix: Stats<number>;
    precision: Stats<number>;
    city: CatStats<City>;
    state: CatStats<IdName>;
    route: CatStats<Route>;
    folder: CatStats<IdName>;
    vehicle: CatStats<Vehicle>;
    direction: CatStats<number>;
    dop: Stats<number>;
    dir: CatStats<IdName>;
    discretizedSpeeds?: Omit<SpeedGroup, "discretizedSpeeds">[];
    speeds?: Speed[];
}

export interface CameraGroup extends PositionGroup {
    source: CatStats<IdName>;
    city: CatStats<City>;
    state: CatStats<IdName>;
    integration: Stats<Date>;
    online: CatStats<boolean>;
    link: CatStats<IdName>;
    provider: CatStats<IdName>;
    model: CatStats<Model>;
    brand: CatStats<IdName>;
    encoderModel: CatStats<Model>;
    encoderBrand: CatStats<IdName>;
    cameras: Camera[];
}