import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // specify the destination folder
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        // specify the file name
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.round()*1E9)
        cd(null, file.originalname)
    }
  })
  
export const upload = multer({
    storage,
})