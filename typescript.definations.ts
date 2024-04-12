
// backend camera api data
export type Userdata = {
    success: boolean,
    message: string,
    accessToken: string,
    id: string
}

declare module "next-auth" {
    interface Session {
        user: Userdata
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: Userdata
    }
}
declare module "next-auth/session" {
    interface SESSION {
        user: Userdata
    }
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


}

export type modalProps = {
    handleFormSubmit: () => Promise<void>,
    handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void,
    formData: camera,
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

}

export type cameraFeatureSlice = {
    data: camera[],
    selectedCamera: camera[],
    onRowSelected: camera | null
}

export type user = {
    _id: string,
    email: string,
    password?: string
}