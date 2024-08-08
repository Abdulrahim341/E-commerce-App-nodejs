const globalError=((err,req,res,next)=>{
    const code =err.statuscode||500
    res.status(code).json({error:'error',message:err.message,code})  //,stack:err.stack
    })
    export default globalError