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
  scalar Token extends string;

  @example("Seafood")
  scalar FoodCategory extends string;

  @example("Nigeria")
  scalar CuisineRegion extends string;

  @example("12345")
  scalar Otp extends string;

  @example(4800.50)
  @minValue(0)
  scalar Price extends numeric;

  model VideoFile extends File {
    contentType: "video/mp4" | "video/webm" | "video/ogg";
  }

  model ImageFile extends File {
    contentType: "image/jpeg" | "image/png" | "image/webp";
  }

  model WithoutTimestamp<T> {
    ...OmitProperties<T, "created_at" | "updated_at" | "deleted_at">;
  }

  enum Role {
    ADMIN,
    USER,
    CHEF,
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

  @tag("Onboarding")
  @route("/onboarding")
  namespace Onboarding {
    @route("/preferences")
    namespace Preferences {
      namespace Request {
        model Body {
          foods: FoodCategory[];
          regions: CuisineRegion[];
        }
      }

      namespace Response {
        namespace Success {
          model PreferencesSet {
            code: "PREFERENCES_SET";
          }

          alias Success = PreferencesSet;
        }

        namespace Error {
          @error
          @doc("One or more regions entered were not found")
          model RegionNotFoundError {
            @statusCode _code: 404;
            code: "ERR_REGION_NOT_FOUND";
          }

          @error
          model UserAlreadyOnboardedError {
            @statusCode _code: 409;
            code: "ERR_USER_ALREADY_ONBOARDED";
          }

          alias Error =
            | UserAlreadyOnboardedError
            | UserNotVerifiedError
            | NotFoundError<"FOOD_TYPE">
            | RegionNotFoundError
            | BadRequestError
            | UnexpectedError;
        }

        alias Response = Success.Success | Error.Error;
      }

      @post
      @doc("Set the user preferences during onboarding")
      op setUserPreferences(@body body: Request.Body): Response.Response;
    }
  }

  model Media {
    @example("h93suhw7mzyujf9tbugy")
    public_id: string;

    @example("https://res.cloudinary.com/dyirc2dvg/image/upload/v1747581547/foodhut/h93suhw7mzyujf9tbugy.jpg")
    url: string;
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
}

