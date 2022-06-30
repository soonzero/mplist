import { convertDuration } from "../../functions/common";
import {
  AddToMyPlaylistSmallBtn,
  DetailBtn,
  LyricsBtn,
  SaveToMineSmallBtn,
} from "../../components/common/Buttons";

const TrackItems = ({ data, showModal, tracksSaved, setTracksSaved }) => {
  const tracks = data.tracks.items;
  const discCount = tracks[tracks.length - 1].disc_number;
  let discArray = [];
  for (let i = 0; i < discCount; i++) {
    discArray[i] = tracks.filter((t) => t.disc_number === i + 1);
  }
  return (
    <section className="grow divide-y-2 text-slate-700 mobile:mt-6 tablet:mt-0 tablet:ml-6">
      <ul>
        {discArray.map((disc, idx) => {
          return (
            <li key={disc.id} className="pt-5 first:pt-0">
              {data.album_type === "album" && (
                <h2 className="flex justify-between items-end py-2 border-b-2 border-b-mplist mobile:px-0 tablet:px-5">
                  CD{idx + 1}
                  <span className="text-sm">
                    {disc.length} {disc.length === 1 ? `track` : `tracks`}
                  </span>
                </h2>
              )}
              <ul className="divide-dashed divide-y-2">
                {disc.map((t, idx) => {
                  return (
                    <li
                      key={t.id}
                      className="relative flex items-center py-3 text-sm cursor-pointer hover:bg-slate-200"
                    >
                      <p className="basis-1/24 text-center">
                        {t.track_number > 9
                          ? t.track_number
                          : `0${t.track_number}`}
                      </p>
                      <LyricsBtn t={t} showModal={showModal} />
                      <h3 className="grow text-black truncate">{t.name}</h3>
                      <p className="text-xs text-gray-500 text-right basis-1/12 px-5">
                        {convertDuration(t.duration_ms)}
                      </p>
                      <DetailBtn />
                      <AddToMyPlaylistSmallBtn t={t} showModal={showModal} />
                      <SaveToMineSmallBtn
                        t={t}
                        tracksSaved={tracksSaved}
                        setTracksSaved={setTracksSaved}
                        idx={idx}
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TrackItems;
