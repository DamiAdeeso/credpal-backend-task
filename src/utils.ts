import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Staff, { IStaff } from "./models/UserSchema"


declare global {
  namespace Express {
    interface Request {
      user?: IStaff;
    }
  }
}

export const generateToken = (user: IStaff): string => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isVerified,
    },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization: string | undefined = req.headers.authorization;
  if (authorization) {
    const token: string = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET as Secret, async (err, decode) => {
      if (err) {
        res.status(401).send({
          message: "Invalid Token",
        });
      } else {
        const decodedUser = decode as IStaff;
        try {
          const staff: IStaff | null = await Staff.findById(decodedUser._id);
          if (staff) {
            req.user = decodedUser;
            next();
          } else {
            res.status(401).send({
              message: "User not found",
            });
          }
        } catch (error) {
          console.error("Error in authentication:", error);
          res.status(500).send({
            message: "Internal server error",
          });
        }
      }
    });
  } else {
    res.status(401).send({
      message: "No Token",
    });
  }
};
