
// backend camera api data
export type camera={
    _id:string,
    name:string,
    distrct:string,
    taluka:string,
    city:string,
    area:string,
    location:string,
    url:string,

}
export type createCamera={
   
    name:string,
    distrct:string,
    taluka:string,
    city:string,
    area:string,
    location:string,
    url:string,

}

export type cameraFeatureSlice={
    data:camera[] 
}

export type user={
    _id:string,
    email:string,
    password?:string
}