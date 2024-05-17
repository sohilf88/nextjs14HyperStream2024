
// backend camera api data
export type Userdata = {
    success: boolean,
    message: string,
    accessToken: string,
    id: string
}





export type camera = {
    _id?: string,
    name: string,
    district: string,
    taluka: string,
    city: string,
    area: string,
    location: string,
    url: string,
    isActive: boolean


}

export type modalProps = {
    handleFormSubmit: () => Promise<void>,
    handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void,
    formData: camera,
    setFormData: () => {}
}
export type createCamera = {
    _id?: string,
    name: string,
    district: string,
    taluka: string,
    city: string,
    area: string,
    location: string,
    url: string,
    isActive: boolean

}

export type cameraFeatureSlice = {
    data: camera[],
    selectedCamera: camera[],
    onRowSelected: camera | null
}

export type user = {
    _id: string,
    email: string,
    password?: string,
    roles: []
}


export type customError = {
    success: boolean,
    message: string,
    status: number
}
