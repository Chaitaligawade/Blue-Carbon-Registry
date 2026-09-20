export const isVerifier = (req,res,next)=>{
    if (req.user.role !== 'Verifier') {
        return res.status(403).json({ error: 'Access denied: Not an Verifier' });
    }
    next();
}