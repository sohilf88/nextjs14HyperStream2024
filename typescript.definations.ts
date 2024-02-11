
// backend camera api data
export type camera={
    _id?:string,
    name:string,
    district:string,
    taluka:string,
    city:string,
    area:string,
    location:string,
    url:string,

}
export type createCamera={
   _id?:string,
    name:string,
    district:string,
    taluka:string,
    city:string,
    area:string,
    location:string,
    url:string,

}

export type cameraFeatureSlice={
    data:camera[],
    selectedCamera:camera[],
    onRowSelected:camera |null
}

export type user={
    _id:string,
    email:string,
    password?:string
}