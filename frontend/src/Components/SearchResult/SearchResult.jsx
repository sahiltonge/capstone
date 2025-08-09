import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { term } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://capstone-9ln6.onrender.com/videos/search?title=${encodeURIComponent(term)}`
        );
        setVideos(res.data.videos);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [term]);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  if (videos.length === 0) return <p style={{ color: "white" }}>No videos found</p>;

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Search results for "{term}"</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {videos.map((video) => (
          <div key={video._id} style={{ border: "1px solid gray", padding: "10px" }}>
            <img src={video.thumbnail} alt={video.title} width="300" />
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <small>By {video.user?.channelName}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
