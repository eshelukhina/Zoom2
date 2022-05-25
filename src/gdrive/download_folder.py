import gdown


def download_folder_from_gdrive(url: str, output_folder: str = "./downloaded_videos"):
    print("Download from url: " + url + ". Output folder: " + output_folder)
    gdown.download_folder(url, quiet=True, output=output_folder)
