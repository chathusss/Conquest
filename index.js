const { type } = require("os");

function sendData() {
    var RequestorName = document.getElementById("reqName").value;
    var Request = document.getElementById("request").value;
    var OrganizationUnit = document.getElementById("orgUnit").value;
    var imageDesc = document.getElementById("textarea").value;
    // validation message
    if (RequestorName.length === 0 || Request.length === 0 || OrganizationUnit === null) {
        swal({
            title: "No Data Found !",
            text: "Please Fill The Form",
            timer: 20000,
            showConfirmButton: true
        });
    } else {

        var reqHeaders = new Headers();
        reqHeaders.append("Authorization", "Bearer vA02hQ/QeFgQZo608FNq1HpkHy8=");
        reqHeaders.append("Accept", "application/json");
        reqHeaders.append("Content-Type", "application/json");
        // json body
        var raw = JSON.stringify({
            "ChangeSet": {
                "Changes": [
                    "RequestDetail",
                    "RequestorName",
                    "OrganisationUnitID"
                ],
                "Updated": {
                    "OrganisationUnitID": OrganizationUnit,
                    "RequestDetail": Request,
                    "RequestorName": RequestorName
                }
            }
        });
        var requestOptions = {
            method: 'POST',
            headers: reqHeaders,
            body: raw,
            redirect: 'follow'
        };
        //fetch the request
        fetch("https://developolis.conquest.live:444/api/requests/create_request", requestOptions)
            .then(response => response.text())
            .then(result => {
                //fetch the image attachment request
                var raw = JSON.stringify({
                    "Address": "https://chathutest.blob.core.windows.net/chathucontainer/Screen Shot 2022-07-29 at 1.06.35 am.png",
                    "ContentType": "image/png",
                    "CreateTime": "2019-08-24T14:15:22Z",
                    "DocumentDescription": imageDesc,
                    "LinkExistingDocument": true,
                    "LocationPrefix": "file://conquest_documents/",
                    "ObjectKey": {
                        "int32Value": result,
                        "objectType": "ObjectType_Request"
                    }
                });

                var requestOptions2 = {
                    method: 'POST',
                    headers: reqHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://developolis.conquest.live:444/api/documents/add_document", requestOptions2)
                    .then(response => response.text())
                    .then(result2 => console.log(result2))
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));



    }


}
//Add document endpoint request
function sendImage() {
    var imageDesc = document.getElementById("textarea").value;
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();

    var filename = document.getElementById("upload").value.replace(/^.*[\\\/]/, '')
    var url = "file///Applications/MAMP/htdocs/Apinew/png" + filename;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer vA02hQ/QeFgQZo608FNq1HpkHy8=");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Address": url,
        "ContentType": "image/png",
        "CreateTime": "2019-08-24T14:15:22Z",
        "DocumentDescription": imageDesc,
        "LinkExistingDocument": true,
        "ObjectKey": {
            "int32Value": 123,
            "objectType": "ObjectType_Asset"
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://developolis.conquest.live:444/api/documents/add_document", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

// const { BlobServiceClient } = require('@azure/storage-blob');
// const selectButton = document.getElementById("imageupload");
// const fileInput = document.getElementById("upload").files[0];
// const blobSasUrl = "https://chathutest.blob.core.windows.net/?sv=2021-06-08&ss=b&srt=co&sp=wctf&se=2022-08-04T01:05:28Z&st=2022-07-30T17:05:28Z&spr=https&sig=la%2FeHNr3RmoI%2F705EiHkMNnFu6uf6RSXkbEZheQNDEk%3D";
// const blobServiceClient = new BlobServiceClient(blobSasUrl);
// const containerName = "chathucontainer";
// const containerClient = blobServiceClient.getContainerClient(containerName);
// const uploadFiles = async() => {
//     try {
//         const promises = [];
//         for (const file of fileInput.file) {
//             const blockBlobClient = containerClient.getBlockBlobClient(file.name);
//             promises.push(blockBlobClient.uploadData(file));
//         }
//         await Promise.all(promises);
//         alert('Done.')
//     } catch (error) {
//         alert(error.message);
//     }
// }

// selectButton.addEventListener("click", () => fileInput.click());
// fileInput.addEventListener("change", uploadFiles);