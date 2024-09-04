
// backend camera api data
export type Userdata = {
    success: boolean,
    message: string,
    accessToken: string,
    id: string
}


export type user = {
    username: string,
    roles: string[],
    email: string,
    _id: string,
    active: boolean,
    password?: string
}


export type camera = {
    _id?: string,
    name: string,
    district: string,
    taluka: string,
    city: string,
    area: string,
    // location: string,
    url: string,
    isActive: boolean


}

export type modalProps = {
    handleFormSubmit: () => Promise<void>,
    handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void,
    formData: camera,
    setFormData: (state:camera[]) => {}
    setRowData: () => {}
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
    onRowSelected: camera | null,
    id: string | undefined | null
}

export type userDetail = {
    _id: string,
    email: string,
    password?: string,
    roles: string
}


export type customError = {
    success: boolean,
    message: string,
    status: number
}


export type jwtAccessType = {

    username: String,
    email: String
    roles: string[],
    _id: string
}

export type usersData = {
    success: boolean,
    message: [],
    totalUsers: number
}