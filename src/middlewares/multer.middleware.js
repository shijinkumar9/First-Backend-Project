import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {// there is one parameter extra of file as it is provided by multer or express.fileuploader 
      cb(null, './public/temp')// all files will be kept in this folder i.e. public
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)// we actually has to rename the original file but for now we are keeping it same as original
    }
  })
  
 export const upload = multer({
     storage,
 })