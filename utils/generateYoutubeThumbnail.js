exports.generateExerciseVideoThumbnail = (exercises) => {
  const exercisesWithThumbnails = exercises.map(exercise => {
    if (exercise.videoURL) {
      const thumbailUrlTemplate =
        "https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg";

      // Extract video id from the video url.
      const videoId = exercise.videoURL.substring(exercise.videoURL.indexOf("=") + 1);

      // inset video id into template
      const thumbnail = thumbailUrlTemplate.replace("<insert-youtube-video-id-here>", videoId);

      // Add thumbnail url property to model, not stored in database.
      exercise.thumbnail = thumbnail;
    } else {
      // Use default picture if exercise does not contain a videoUrl
      exercise.thumbnail = "/img/thumbnail.jpg"
    }

    return exercise;
  });

  return exercisesWithThumbnails;
};
