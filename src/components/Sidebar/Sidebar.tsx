import { useState, useEffect } from "react";
import { motion, useCycle } from "framer-motion";

import "./Sidebar.css";

const trackList = [
  {
    name: "Login Theme",
    src: "/audio/logintheme.mp3"
  },
  {
    name: "Temple of Time",
    src: "/audio/templeoftime.mp3"
  },
  {
    name: "When the morning comes",
    src: "/audio/whenthemorningcomes.mp3"
  }
]

const volumeIconSources = {
  enabled: "/images/volume_enabled.png",
  disabled: "/images/volume_disabled.png"
}

const Sidebar = () => {

  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(0.5);
  const [volumeIcon, setVolumeIcon] = useState(volumeIconSources.enabled);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [open, cycleOpen] = useCycle(false, true);

  useEffect(() => {
    let subscribed = true;

    const playTrack = async () => {
      if (subscribed) await music?.play();
    }

    if (music) {
      playTrack();
    }

    return () => { subscribed = false }
  }, [music]);

  useEffect(() => {
    if (music) music.volume = volume;
  }, [volume, music]);

  return (
    <div className="outer-container">
      <motion.aside initial={{ width: 100 }} animate={open ? { width: 300 } : { width: 100 }}>
        <motion.div
          className="container"
          onMouseEnter={() => {
            cycleOpen();
          }}
          onMouseLeave={() => {
            cycleOpen();
          }}
        >
          {open ?
            <motion.div className="selections">
              <div className="volume-container">
                <motion.img className="icon" src={volumeIcon} alt="vol" />
                <motion.input type="range" min="0" max="10" step="1" defaultValue={volume * 10} className="slider"
                  onChange={(e) => {
                    const newVolume = parseInt(e.target.value) / 10;

                    if (volume === 0 && newVolume > volume) {
                      setVolumeIcon(volumeIconSources.enabled);
                      console.log("set enabled");
                    } else if (newVolume === 0) {
                      setVolumeIcon(volumeIconSources.disabled);
                      console.log("set disabled");
                    }

                    setVolume(newVolume);
                  }} />
              </div>
              {
                trackList.map(({ name, src }) => {
                  return (
                    <motion.button
                      key={name}
                      className={selectedButton === name ? "selected" : ""}
                      onClick={(event) => {
                        music?.pause();
                        setMusic(new Audio(src));
                        setSelectedButton(name);
                        event.currentTarget.classList.toggle("selected");
                      }}
                    >
                      {name}
                    </motion.button>
                  );
                })
              }
            </motion.div>
            :
            <motion.img
              src={"/images/musicnote.png"}
              alt="Music Note"
              className="icon"
            />
          }
        </motion.div>
      </motion.aside>
    </div>
  );
};

export default Sidebar;
