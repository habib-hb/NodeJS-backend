document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObj = {};
    formData.forEach((value, key) => formObj[key] = value);

    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        });

        if (response.ok) {
            console.log('Data submitted successfully');
            // Clear form fields
            this.reset();
            // Show success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Comment submission was successful.';
            successMessage.style.color = 'blue';
            successMessage.style.textAlign = 'center';
            this.appendChild(successMessage);
           

            //last comment extraction ------

            // Function to fetch the last comment from the backend and render it
async function fetchAndRenderLastComment() {
    try {
        const response = await fetch('/api/comments/last');
        if (!response.ok) {
            throw new Error('Failed to fetch last comment');
        }
        const lastComment = await response.json();
        if (lastComment) {
            const commentContainer = document.createElement('div');
            commentContainer.classList.add('comment');
            
            commentContainer.innerHTML = `
                <div class="single-comment-section">
                    <hr>
                    <div class="single-comments">
                        <h2>Comment No.${document.querySelectorAll(".comment").length + 1}</h2>
                        <p><b>Commenter's Name:</b> ${lastComment.name}.</p>
                        <p><b>Commenter's E-mail:</b><span> ${lastComment.email.slice(0, 30).length < lastComment.email.length ? lastComment.email.slice(0, 30) + "..." : lastComment.email}.</span></p>
                        <p><b>Commenter's Phone:</b> ${lastComment.phone}.</p>
                    
                        <div class="comment-body">
                            <h3>Comment</h3><hr style='opacity:0.5'>
                            <p style='justify-content:center'>${lastComment.text}</p>
                        </div>
                        <div class="button-container">
                            <button class="edit-comment-btn" onclick="editComment('${lastComment._id}')">Edit</button>
                            <button class="delete-comment-btn" onclick="deleteComment('${lastComment._id}')">Delete</button>
                        </div>
                    </div>
                    <hr style='opacity:1'>
                </div><br>
            `;
    
            document.querySelector('.comments').appendChild(commentContainer);
        } else {
            console.log('No last comment found.');
        }
    } catch (error) {
        console.error('Error fetching and rendering last comment:', error);
    }
}

            fetchAndRenderLastComment();

            //------

        } else {
            console.error('Failed to submit data');
            // Handle error cases, show error message to the user, etc.
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error cases, show error message to the user, etc.
    }
});





document.addEventListener('DOMContentLoaded', async function() {
// Fetch comments from the backend API
try {
    const response = await fetch('/api/comments');
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    const comments = await response.json();
    displayComments(comments);
} catch (error) {
    console.error('Error:', error);
    // Handle error cases, show error message to the user, etc.
}
});

// Function to display comments in the HTML section
function displayComments(comments) {
const commentsSection = document.querySelector('.comments');
commentsSection.innerHTML = ''; // Clear existing content

comments.forEach((comment, index) => {
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');
    

    commentContainer.innerHTML = `
    <div class="single-comment-section">
    <hr>
    <div class="single-comments">
            <h2>Comment No.${index + 1}</h2>
            <p><b>Commenter's Name:</b> ${comment.name}.</p>
            <p><b>Commenter's E-mail:</b><span> ${comment.email.slice(0, 30).length < comment.email.length ? comment.email.slice(0, 30) + "..." : comment.email}.</span></p>
            <p><b>Commenter's Phone:</b> ${comment.phone}.</p>
        
        <div class="comment-body">
            <h3>Comment</h3><hr style='opacity:0.5'>
            <p style='justify-content:center'>${comment.text}</p>
        </div>
        <div class="button-container">
            <button class="edit-comment-btn" onclick="editComment('${comment._id}')">Edit</button>
            <button class="delete-comment-btn" onclick="deleteComment('${comment._id}')">Delete</button>
        </div>
        </div>
        <hr style='opacity:1'>
        </div><br>
    `;

    commentsSection.appendChild(commentContainer);
});
}



async function editComment(commentId) {
// Retrieve the comment details based on the commentId (you can fetch the details from your database)
const comment = await getCommentDetails(commentId); // Implement this function to retrieve comment details
async function getCommentDetails(commentId) {
try {
const response = await fetch(`/api/comments/${commentId}`);
if (!response.ok) {
    throw new Error('Failed to fetch comment');
}
const comment = await response.json();
console.log(comment)
return comment;
} catch (err) {
throw new Error(`Failed to fetch comment details: ${err.message}`);
}
}

// Create a form dynamically to edit the comment
const form = document.createElement('form');
form.innerHTML = `
    <button type="button" id="close-icon-btn">X</button> 
    <label for="edit-name">Name:</label>
    <input type="text" id="edit-name" name="name" value="${comment.name}"><br><br>
    <label for="edit-email">Email:</label>
    <input type="email" id="edit-email" name="email" value="${comment.email}"><br><br>
    <label for="edit-phone">Phone:</label>
    <input type="text" id="edit-phone" name="phone" value="${comment.phone}"><br><br>
    <label for="edit-text">Text:</label>
    <textarea id="edit-text" name="text">${comment.text}</textarea><br><br>
    <button type="button" onclick="updateComment('${commentId}')">Update</button>
    <button type="button" id="close-btn">Cancel</button> <!-- Close button -->
`;
form.setAttribute('class', 'edit-form');

// Display the form in a dialog box
const dialog = document.createElement('dialog');
dialog.setAttribute('class', 'dialog-form');
dialog.appendChild(form);
document.body.appendChild(dialog);
dialog.showModal();

// Close button functionality
const closeBtn = form.querySelector('#close-btn');
closeBtn.addEventListener('click', () => {
    dialog.close(); // Close the dialog box when the close button is clicked
});

// Close button functionality
const closeIconBtn = form.querySelector('#close-icon-btn');
closeIconBtn.addEventListener('click', () => {
    dialog.close(); // Close the dialog box when the close button is clicked
});

// Close dialog box when clicking outside the dialog
dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});
}

function updateComment(commentId) {
// Retrieve the updated values from the form
const updatedName = document.getElementById('edit-name').value;
const updatedEmail = document.getElementById('edit-email').value;
const updatedPhone = document.getElementById('edit-phone').value;
const updatedText = document.getElementById('edit-text').value;

// Prepare the updated comment data
const updatedCommentData = {
name: updatedName,
email: updatedEmail,
phone: updatedPhone,
text: updatedText
};

// Send a PUT request to update the comment
fetch(`/api/comments/${commentId}`, {
method: 'PUT',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(updatedCommentData)
})
.then(response => {
if (!response.ok) {
    throw new Error('Failed to update comment');
}
return response.json();
})
.then(updatedComment => {
alert('Comment updated successfully');
// Optionally, you can close the dialog box here
const dialog = document.querySelector('dialog');
dialog.close();
})
.catch(error => {
console.error('Error updating comment:', error.message);
alert('Failed to update comment');
});
}

//deleting comment------ 
async function deleteComment(commentId) {
    // Ask for confirmation before deleting the comment
    const confirmed = confirm("Are you sure you want to delete this comment?");
    
    if (!confirmed) {
        return; // If not confirmed, exit the function
    }

    try {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // If the deletion is successful, remove the comment from the UI
            alert("Comment Deleted");
        } else {
            console.error('Failed to delete comment');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}





