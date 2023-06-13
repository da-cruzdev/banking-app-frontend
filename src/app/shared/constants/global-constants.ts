export class GlobalConstants {
  public static genericError: string =
    'Something went wrong.Please try again later!!!';

  public static nameRegex: string = "/^[a-z ,.'-]+$/i";

  public static emailRegex = '^[w-.]+@([w-]+.)+[w-]{2,4}$';

  public static passwordRegex = '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$';
}
