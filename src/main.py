from src.gdrive.download_folder import download_folder_from_gdrive

if __name__ == '__main__':
    print("Enter folder id:")

    folder_id = input()
    url = "https://drive.google.com/drive/folders/" + folder_id

    print("Enter output folder:")
    output_folder = input()

    download_folder_from_gdrive(url=url, output_folder=output_folder)

