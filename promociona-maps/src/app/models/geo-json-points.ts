export interface GeoJSONPoints {
    type: string;
    features: Feature[];
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    name: string;
}

export interface Feature {
    type: string;
    geometry: Geometry;
    properties: Properties;
}

