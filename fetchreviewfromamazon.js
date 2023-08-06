const reviewElements = document.querySelectorAll('span[data-hook="review-body"]');
const ratingElements = document.querySelectorAll('i[data-hook="review-star-rating"]');

const reviews = [];
const ratings = [];

reviewElements.forEach(element => {
  const reviewText = element.innerText.trim();
  reviews.push(reviewText);
});

ratingElements.forEach(element => {
  const ratingText = element.innerText.trim();
  const ratingValue = parseFloat(ratingText.split(' ')[0]);
  ratings.push(ratingValue);
});

// Combine reviews and ratings into a single array of objects
const data = reviews.map((review, index) => {
  return {
    review: review,
    rating: ratings[index]
  };
});

// Create CSV string
let csv = "Review,Rating\n";
data.forEach(item => {
  csv += `"${item.review.replace(/"/g, '""')}",${item.rating}\n`;
});

// Function to download CSV file
function downloadCSV(csv) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'amazon_reviews.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Download CSV file
downloadCSV(csv);
