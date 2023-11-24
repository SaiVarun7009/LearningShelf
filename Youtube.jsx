import React, { useState } from 'react';
import './Youtube.css'
import YouTubeLogo from './YouTubeLogo2.png'
import GithubLogo from './GithubLogo.png'
import GoogleLogo from './GoogleLogo.jfif'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import Google from './LogoComponent';
// import { handleDeleteLink } from './CourseResources';



function Youtube({link, description}) {
  return (
    // <div>
      // {/* <h2>{link}</h2> */}
      <div className='YouTubeFrame'>
        <iframe
          width="260"
          height="175"
          src={link}
          title="YouTube Playlist"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p>{description}</p>
      </div>
    // </div>
  );
}

function Github({link, description}){
  return(
    <div>
      <div className='GithubFrame'>
        {/* <Link to={link} >
          <img src={GithubLogo} alt="Clickable Image" style={{width:"75px", height:"75px"}} />
        </Link> */}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={GithubLogo} alt="Click to Navigate" />
        </a>

        <p>{description}</p>
      </div>
    </div>
  )
}


const ResourceComponent = ({ type, link, description }) => {
  switch (type) {
    case 'Youtube':
      return <Youtube link={link} description={description} />;
    case 'Github':
      return <Github link={link} description={description} />;
    // Add more cases for other resource types if needed
    default:
      return <Google webpageUrl={link} description={description}/>; // Or a default component for unknown resource types
  }
};


const ResourcePanel = ({name, type, links, handleDeleteLink, resourceIndex}) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  // console.log(links);

  const logos = {
    Youtube: YouTubeLogo, // Replace YoutubeLogo with the actual YouTube logo URL
    Github: GithubLogo,   // Replace GithubLogo with the actual GitHub logo URL
    Google: GoogleLogo
    // Add more types and corresponding logo URLs here if needed
  };

  return (
    <div className='reference'>
      {/* <h1>Reference Links</h1> */}
        <div className={`sourceBox sourceColor-${type}`}>
          <div className="sourceBoxTitle">
            <h3>{name} References</h3>
            {/* <p>15 Playlists</p> */}
          </div>
          <div className='sourceBoxInfo'>
            <button className='sourceBoxButton' onClick={onOpenModal}>{type}</button>
            <img src= {logos[type]} alt="Logo" height="50px" width="70px" />
          </div>
          
        </div>
        <Modal open={open} onClose={onCloseModal} center styles={{ modal: { maxWidth: '1200px', } }}>
          <h2>{name} References</h2>
          <div className="YoutubeLinks">
            {links.map((link, index) => (
              <div key={index} >
                < ResourceComponent type={type} link={link.Link} description={link.Description} />
                {/* <Youtube link={link.Link} description={link.Description} />  */}
                <button onClick={() => handleDeleteLink(resourceIndex, index)}>Delete</button>
            </div>
            
            ))}
          </div>
          
        </Modal>
        
        
    </div>
  )
}

export default ResourcePanel