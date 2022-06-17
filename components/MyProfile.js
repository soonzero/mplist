import Image from "next/image";

const MyProfile = ({ info }) => {
  return (
    <div className="py-4 flex flex-col mb-8">
      <h1 className="font-bold text-3xl mb-4">내 프로필</h1>
      <div className="flex">
        <Image
          src={info.images[0]?.url || `/profile.svg`}
          width={200}
          height={200}
        />
        <table className="grow ml-12">
          <thead>
            <tr className="border-y">
              <td className="px-5 py-2 text-right text-gray-500">성명</td>
              <td className="px-5 py-2 font-medium">{info.display_name}</td>
            </tr>
            <tr className="border-y">
              <td className="px-5 py-2 text-right text-gray-500">
                사용자 이름
              </td>
              <td className="px-5 py-2 font-medium">{info.id}</td>
            </tr>
            <tr className="border-y">
              <td className="px-5 py-2 text-right text-gray-500">이메일</td>
              <td className="px-5 py-2 font-medium">{info.email}</td>
            </tr>
            <tr className="border-y">
              <td className="px-5 py-2 text-right text-gray-500">팔로워</td>
              <td className="px-5 py-2 font-medium">{info.followers.total}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default MyProfile;
