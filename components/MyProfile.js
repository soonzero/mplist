import Image from "next/image";

const MyProfile = ({ info }) => {
  return (
    <section className="py-4 flex flex-col mb-8">
      <h1 className="font-bold text-3xl mb-4 mobile:text-2xl">내 프로필</h1>
      <figure className="flex mobile:flex-col tablet:flex-row">
        <Image
          src={info.images[0]?.url || `/profile.svg`}
          width={200}
          height={200}
        />
        <table className="grow mobile:text-xs">
          <thead>
            <tr className="border-y">
              <td className="mobile-lg:px-2 tablet:px-5 py-2 text-right text-gray-500">
                성명
              </td>
              <td className="mobile-lg:px-2 tablet:px-5 py-2 font-medium truncate">
                {info.display_name}
              </td>
            </tr>
            <tr className="border-y">
              <td className="mobile-lg:px-2 tablet:px-5 py-2 text-right text-gray-500">
                사용자 이름
              </td>
              <td className="mobile-lg:px-2 tablet:px-5 py-2 font-medium truncate">
                {info.id}
              </td>
            </tr>
            <tr className="border-y">
              <td className="mobile-lg:px-2 tablet:px-5 py-2 text-right text-gray-500">
                이메일
              </td>
              <td className="mobile-lg:px-2 tablet:px-5 py-2 font-medium truncate">
                {info.email}
              </td>
            </tr>
            <tr className="border-y">
              <td className="mobile-lg:px-2 tablet:px-5 py-2 text-right text-gray-500">
                팔로워
              </td>
              <td className="mobile-lg:px-2 tablet:px-5 py-2 font-medium truncate">
                {info.followers.total}
              </td>
            </tr>
          </thead>
        </table>
      </figure>
    </section>
  );
};

export default MyProfile;
