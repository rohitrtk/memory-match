import React, { useState, useEffect, useContext } from "react";
import { motion, useCycle } from "framer-motion";
import { BackdropImages, BackdropIndexContext } from "./../Backdrop/Backdrop";

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

  const { index, setIndex } = useContext(BackdropIndexContext);

  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(0.5);
  const [volumeIcon, setVolumeIcon] = useState(volumeIconSources.enabled);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [open, cycleOpen] = useCycle(false, true);

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value) / 10;

    if (volume === 0 && newVolume > volume) {
      setVolumeIcon(volumeIconSources.enabled);
    } else if (newVolume === 0) {
      setVolumeIcon(volumeIconSources.disabled);
    }

    setVolume(newVolume);
  }

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
      <motion.aside initial={{ width: 60 }} animate={open ? { width: 300 } : { width: 60 }}>
        <motion.div
          className="container"
          animate={{ background: BackdropImages[index].sidebarColour }}
          onMouseEnter={() => {
            cycleOpen();
          }}
          onMouseLeave={() => {
            cycleOpen();
          }}
        >
          {open ?
            <motion.div className="selections">
              <h2>Music</h2>
              <div className="volume-container">
                <motion.img className="icon" src={volumeIcon} alt="vol" />
                <motion.input type="range" min="0" max="10" step="1" defaultValue={volume * 10} className="slider" onChange={onVolumeChange} />
              </div>
              {
                trackList.map(({ name, src }) => {
                  return (
                    <motion.button
                      key={name}
                      className={selectedButton === name ? "selected" : ""}
                      whileHover={{ scale: 1.05 }}
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
              <h2>Background</h2>
              {
                BackdropImages.map((image, index) => {
                  return (
                    <motion.img
                      className="thumbnail"
                      key={`thumbnail_${index}`}
                      src={image.low}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setIndex(index);
                      }}
                    />
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
}

export default Sidebar;
