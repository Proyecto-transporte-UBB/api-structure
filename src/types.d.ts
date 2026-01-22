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
    mean: T;
    logMean: T;
    median: T;
    stdDev: T;
    logStdDev: T;
    min: T;
    max: T;
    NAs: number;
}

export interface CatStats<T> {
    total: number;
    categories: [T | undefined, number][];
}

export interface PositionGroup {
    latitude: Stats<number>;
    longitude: Stats<number>;
}

export interface WazeRouteGroup {
    date: Stats<Date>;
    historicTime: Stats<number>;
    from: CatStats<Street>;
    name: CatStats<IdName>;
    to: CatStats<Street>;
    length: Stats<number>;
    time: Stats<number>;
    jamLevel: Stats<number>;
    type: CatStats<IdName>;
    wazeRoutes: WazeRoute[];
}

export interface AlertGroup extends Partial<PositionGroup> {
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
    alerts: Alert[];
}

export interface SpeedGroup extends PositionGroup {
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
    speeds: Speed[];
}

export interface CameraGroup extends PositionGroup {
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