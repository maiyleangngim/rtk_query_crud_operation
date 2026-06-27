import { VerifyUserRequest, VerifyUserResponse } from "@/lib/verify";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

type UserLoginRequest = {
    email: string;
    password: string;
};

type UserRegisterRequest = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    address?: AddresRequest;
}

type AddresRequest ={
    addressLine1: string;
    addressLine2: string;
    road: string;
    linkAddress: string;

}


// data that the API returns after the request succeeds
type UserRegisterResponse ={
    message?: string;
}

type AuthResponse = {
    type?: string;
    accessToken?: string;
    refreshToken?: string;
};

const defaultRegisterAddress: AddresRequest = {
    addressLine1: "Default address",
    addressLine2: "",
    road: "",
    linkAddress: ""
}





export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_ISHOP_BASE_URL}`,
    }),
    endpoints: (builder) => ({

        loginUser: builder.mutation<AuthResponse, UserLoginRequest>({
            query: ({ email, password }) => ({
                url: `/auth/login`,
                method: "POST",
                body: {
                    email,
                    password,
                },
            }),
        }),
        registerUser: builder.mutation<UserRegisterResponse, UserRegisterRequest>({
            query: (body) => ({
                url: `/users/user-signup`,
                method: "POST",
                body:{
                    ...body,
                    address: body.address ?? defaultRegisterAddress,
                }
            })
        }),
        verifyUser: builder.mutation<VerifyUserResponse, VerifyUserRequest>({
            query: ({token}) => ({
                url: `/users/verify-email`,
                method: "POST",
                body:{
                    token
                }
            })
        })
    }),

});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useVerifyUserMutation
} = authApi