import "@typespec/http";

using Http;

@service(#{ title: "API Documentation" })
namespace ApiDocs;

@doc("API")
namespace Api {
  @example("f47ac10b-58cc-4372-a567-0e02b2c3d479")
  scalar Id extends string;

  @example("Mary Slessor")
  scalar FullName extends string;

  @example("HE6G1U")
  scalar ReferralCode extends string;

  @example("2000-01-01")
  scalar DateOfBirth extends string;

  @example("+2348123456789")
  scalar PhoneNumber extends string;

  @example("2021-09-01T12:00:00Z")
  scalar DateTime extends string;

  @example("745731af4484f323968969eda289aeee")
  scalar AuthToken extends string;

  model MediaDescription {
    @example("server")
    source: string;

    @example("QmXoypizjW3WknFiJnKLwL7Qh18qJnZ7qQFp2kFmCtmDZ9")
    id: string;

    @example("https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwL7Qh18qJnZ7qQFp2kFmCtmDZ9")
    url: string;
  }

  @example("12345")
  scalar Otp extends string;

  model VideoFile extends File {
    contentType: "video/mp4" | "video/webm" | "video/ogg";
  }

  model ImageFile extends File {
    contentType: "image/jpeg" | "image/png" | "image/webp";
  }

  model WithoutTimestamp<T> {
    ...OmitProperties<T, "created_at" | "updated_at" | "deleted_at">;
  }

  @example("mary.slessor@mail.com")
  scalar Email extends string;

  @example("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30")
  scalar Jwt extends string;

  @error
  model ZodFlattenedError {
    formErrors: string[];

    @example(#{ name: #["Required"], age: #["Required"] })
    fieldErrors: unknown;
  }

  @error
  model UnexpectedError {
    @statusCode _code: 500;
    code: "ERR_UNEXPECTED";
  }

  @error
  model BadRequestError {
    @statusCode _code: 400;
    code: "ERR_EXPECTED_DATA_NOT_RECEIVED";
    data: ZodFlattenedError;
  }

  @error
  model NotFoundError<T> {
    @statusCode _code: 404;
    code: "ERR_${T}_NOT_FOUND";
  }

  @error
  model UserNotVerifiedError {
    @statusCode _code: 401;
    code: "ERR_USER_NOT_VERIFIED";
  }

  @error
  model UnauthorizedError {
    @statusCode _code: 401;
    code: "ERR_UNAUTHORIZED";
  }

  namespace Pagination {
    model Options {
      page: int64;
      per_page: int64;
    }

    model Meta {
      ...Options;
      total: int64;
    }

    model Paginated<T> {
      data: T[];
      meta: Meta;
    }

    model Query {
      @query
      @minValue(1)
      page?: integer;

      @query
      @minValue(10)
      @maxValue(100)
      per_page?: integer;
    }
  }

  @tag("Auth")
  @route("/auth")
  namespace Authentication {
    model User {
      id: Id;
      full_name: FullName;
      email: Email;
      phone_number: PhoneNumber;
      created_at: DateTime;
      updated_at: DateTime | null;
    }

    namespace Verification {
      namespace Verify {
        namespace Request {
          model Body {
            email: Email;
            otp: Otp;
          }
        }

        namespace Response {
          namespace Success {
            model AuthCredentials {
              code: "AUTH_CREDENTIALS";
              data: {
                access_token: Jwt;
                refresh_token: Jwt;
              };
            }

            alias Success = AuthCredentials;
          }

          namespace Error {
            @error
            model InvalidOrExpiredOtpError {
              @statusCode _code: 400;
              code: "ERR_INVALID_OR_EXPIRED_OTP";
            }

            alias Error = InvalidOrExpiredOtpError | BadRequestError | UnexpectedError;
          }

          alias Response = Success.Success | Error.Error;
        }
      }

      namespace SendVerificationEmail {
        namespace Request {
          model Body {
            email: Email;
          }
        }

        namespace Response {
          namespace Success {
            model VerificationEmailSent {
              code: "VERIFICATION_EMAIL_SENT";
            }

            alias Success = VerificationEmailSent;
          }

          namespace Error {
            @error
            model UserAlreadyVerifiedError {
              @statusCode _code: 400;
              code: "ERR_USER_ALREADY_VERIFIED";
            }

            @error
            model VerificationEmailAlreadySentError {
              @statusCode _code: 400;
              code: "ERR_VERIFICATION_EMAIL_ALREADY_SENT";
              data: {
                expires_at: DateTime;
              };
            }

            @error
            model TokenNotExpiredError {
              @statusCode _code: 400;
              code: "ERR_TOKEN_NOT_EXPIRED";
            }

            alias Error =
              | TokenNotExpiredError
              | VerificationEmailAlreadySentError
              | UserAlreadyVerifiedError
              | NotFoundError<"USER">
              | BadRequestError
              | UnexpectedError;
          }

          alias Response = Success.Success | Error.Error;
        }
      }
    }

    @route("/sign-up")
    namespace SignUp {
      namespace SignUp {
        namespace Request {
          model Body {
            ...WithoutTimestamp<OmitProperties<Api.Authentication.User, "id">>;
            referral_code?: ReferralCode;
          }
        }

        namespace Response {
          namespace Success {
            model VerificationEmailSent {
              code: "VERIFICATION_EMAIL_SENT";
            }

            alias Success = VerificationEmailSent;
          }

          namespace Error {
            @error
            model EmailAlreadyInUseError {
              @statusCode _code: 409;
              code: "ERR_EMAIL_ALREADY_IN_USE";
            }

            alias Error = EmailAlreadyInUseError | BadRequestError | UnexpectedError;
          }

          alias Response = Success.Success | Error.Error;
        }

        @post
        @doc("Sign up new user")
        op signUp(@body body: Request.Body): Response.Response;
      }

      @route("/verification")
      namespace Verification {
        namespace Verify {
          namespace Request {
            model Body {
              email: Email;
              otp: Otp;
            }
          }

          namespace Response {
            namespace Success {
              model Success {
                code: "AUTH_CREDENTIALS";
                data: {
                  access_token: Jwt;
                  refresh_token: Jwt;
                };
              }
            }

            namespace Error {
              @error
              model InvalidOrExpiredTokenError {
                @statusCode _code: 400;
                code: "ERR_INVALID_OR_EXPIRED_TOKEN";
              }

              alias Error = InvalidOrExpiredTokenError | UnexpectedError;
            }

            alias Response = Success.Success | Error.Error;
          }

          @post
          @doc("Verify email")
          op verifySignUpEmail(@body body: Request.Body): Response.Response;
        }

        @route("/resend")
        namespace ResendVerification {
          namespace Request {
            model Body
              extends Api.Authentication.Verification.SendVerificationEmail.Request.Body {}
          }

          namespace Response {
            namespace Success {
              alias Success = Api.Authentication.Verification.SendVerificationEmail.Response.Success.Success;
            }

            namespace Error {
              alias Error = Api.Authentication.Verification.SendVerificationEmail.Response.Error.Error;
            }

            alias Response = Success.Success | Error.Error;
          }

          @post
          @doc("Resend verification email")
          op resendSignUpVerificationEmail(
            @body body: Request.Body,
          ): Response.Response;
        }
      }
    }

    @route("/sign-in")
    namespace SignIn {
      namespace SignIn {
        namespace Request {
          model Body {
            email: Email;
          }
        }

        namespace Response {
          namespace Success {
            alias Success = Api.Authentication.SignUp.SignUp.Response.Success.VerificationEmailSent;
          }

          namespace Error {
            alias Error = NotFoundError<"USER"> | BadRequestError | UnexpectedError;
          }

          alias Response = Success.Success | Error.Error;
        }

        @post
        @doc("Send email to sign in user")
        op sendSignInEmail(@body body: Request.Body): Response.Response;
      }

      @route("/verification")
      namespace Verification {
        namespace Verify {
          alias Request = Api.Authentication.Verification.Verify.Request;
          alias Response = Api.Authentication.Verification.Verify.Response;

          @post
          @doc("Verify email")
          op verifySignInEmail(@body body: Request.Body): Response.Response;
        }

        @route("/resend")
        namespace ResendVerification {
          alias Request = Api.Authentication.Verification.SendVerificationEmail.Request;
          alias Response = Api.Authentication.Verification.SendVerificationEmail.Response;

          @post
          @doc("Resend verification email")
          op resendSignInVerificationEmail(
            @body body: Request.Body,
          ): Response.Response;
        }
      }
    }

    @route("/profile")
    namespace Profile {
      namespace Request {

      }

      namespace Response {
        namespace Success {
          model UserProfile {
            @statusCode _code: 200;
            code: "USER_PROFILE";
            data: User;
          }

          alias Success = UserProfile;
        }

        namespace Error {
          alias Error = NotFoundError<"USER"> | UnauthorizedError | UnexpectedError;
        }

        alias Response = Success.Success | Error.Error;
      }

      @get
      @doc("Get user profile")
      @useAuth(BearerAuth)
      op getProfile(): Response.Response;
    }
  }

  @tag("Storage")
  @route("/storage")
  namespace Storage {
    @route("/upload")
    namespace Upload {
      namespace Request {
        model Headers {
          @header
          contentType: "multipart/form-data";
        }

        model Body {
          files: HttpPart<ImageFile[]>;
        }
      }

      namespace Response {
        namespace Success {
          model MediaUploadSuccess {
            code: "MEDIA_UPLOADED";
            data: MediaDescription[];
          }
          alias Success = MediaUploadSuccess;
        }

        namespace Error {
          alias Error = BadRequestError | UnauthorizedError | UnexpectedError;
        }

        alias Response = Success.Success | Error.Error;
      }

      @post
      @useAuth(BearerAuth)
      @doc("Upload multiple media files")
      op uploadMedia(
        ...Request.Headers,
        @multipartBody body: Request.Body,
      ): Response.Response;
    }

    namespace GetFile {
      namespace Request {
        model Path {
          @path
          fileId: Id;
        }
      }

      namespace Response {
        namespace Success {
          model FileDescription {
            @statusCode _code: 200;
            code: "FILE_DESCRIPTION";
            data: MediaDescription;
          }
          alias Success = FileDescription;
        }

        namespace Error {
          alias Error = NotFoundError<"FILE"> | UnauthorizedError | UnexpectedError;
        }

        alias Response = Success.Success | Error.Error;
      }

      @get
      @route("/{fileId}")
      @useAuth(BearerAuth)
      @doc("Get a single media file by ID")
      op getFile(...Request.Path): Response.Response;
    }
  }
}
