// Function to dynamically load and display content
function animateCoverUp(card) {
    // Get the position of the clicked card
    var cardPosition = card.getBoundingClientRect(); // DOMRect object with values
    // Get the style of the clicked card
    var cardStyle = getComputedStyle(card);
    
    // Set cover position and color
    setCoverPosition(cardPosition);
    setCoverColor(cardStyle);
    
    // Scale cover to fill the window
    scaleCoverToFillWindow(cardPosition);

    // Get the label from the clicked card (assuming the label is stored in card.children[1])
    var cardLabel = card.children[1].textContent.trim();

   // Initialize paragraphText as an empty string
   var paragraphText = '';

   // Function to fetch JSON data and update the paragraphText
   fetch('path/to/your.json')
       .then(response => response.json())
       .then(data => {
           // Find the object in the JSON array with the matching label
           var matchingArticle = data[cardLabel];

           // If a match is found, update the paragraphText with the matching label's value
           if (matchingArticle) {
               paragraphText = matchingArticle.label; // Set paragraphText to the label's value
           } else {
               // Handle case where no matching label is found
               console.error('No matching article found for label:', cardLabel);
               paragraphText = 'Content not found with label:', cardLabel;
           }

           // Update the content of the opened page with the paragraphText
           openContentText.innerHTML = `<h1>${card.children[2].textContent}</h1>${paragraphText}`;
       })
       .catch(error => {
           console.error('Error loading content:', error);
           openContentText.innerHTML = `<h1>${card.children[2].textContent}</h1><p>Error loading content.</p>`;
       });

   // Set the open content image (assuming card.children[1] is the image element)
   openContentImage.src = card.children[1].src;

   // Delay to simulate the animation, then set pageIsOpen to true
   setTimeout(function() {
       pageIsOpen = true;
   }, 300);
}