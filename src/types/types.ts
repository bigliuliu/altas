//user type
export type ResponseData = {
    message: string
  }

  export type middleWareResponse={
    _userdata:{
      _id: string;
      password: string;
      role: string;
      phoneNumber: string;
      fullName: string;
      createdAt: string;
      updatedAt: string;
      status: string;
      __v: number;
    }      
  }