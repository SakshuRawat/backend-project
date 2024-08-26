import {v2 as cloudinary} from "cloudinary"

import fs from "fs"  // file system in node js, bydefault comes with node js , 

import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,  
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
   // METHOD TO UPLOAD FILE/ image we use try catch

   const uploadOnCloudinary = async (localFilePath)=>{
      try{
            if(!fileUploadPath) return null
            // upload fiile path on cloudinary
          const response = await  cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            // file has been successfully uploaded
            console.log("file is uploaded on cloudinary", response.url);
            return response;
      }
      catch(error){
        fs.unlineSync(localFilePath) // remove the locally aved temporary file as the upload operation get failed
        return null;
      }
   }

   export {uploadOnCloudinary};

