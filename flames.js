function startFlamesCalculation() {
    const name1 = document.getElementById("name1").value.toLowerCase().replace(/[^a-z]/g, "");
    const name2 = document.getElementById("name2").value.toLowerCase().replace(/[^a-z]/g, "");
    
    if (!name1 || !name2) {
        alert("Please enter both names.");
        return;
    }

    // Display the calculation steps and reset animation states
    document.getElementById("calculation-steps").style.display = "block";
    document.getElementById("crossed-letters").textContent = "";
    document.getElementById("final-result").textContent = "";

    const flamesResult = calculateFlames(name1, name2);
    animateFlamesResult(flamesResult);
}

function calculateFlames(name1, name2) {
    // Cross out matching letters and display remaining letters
    let crossedText = "";
    let remainingLetters = [...name1, ...name2];

    name1.split("").forEach(letter => {
        if (name2.includes(letter)) {
            remainingLetters.splice(remainingLetters.indexOf(letter), 1);
            name2 = name2.replace(letter, "");
            crossedText += `<s>${letter}</s> `;
        } else {
            crossedText += `${letter} `;
        }
    });
    crossedText += `| ${name2.split("").join(" ")}`;
    document.getElementById("crossed-letters").innerHTML = crossedText;

    const remainingLength = remainingLetters.length;
    const uniqueCount = remainingLength % 6;
    
    const flames = ["Friends", "Love", "Affection", "Marriage", "Enemies", "Siblings"];
    return flames[uniqueCount];
}

// Animate the final result by lighting up each letter in FLAMES
function animateFlamesResult(result) {
    const flamesLetters = document.querySelectorAll("#flames-animation span");

    flamesLetters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.3}s`;
    });

    setTimeout(() => {
        document.getElementById("final-result").textContent = `Your relationship is: ${result}`;
    }, flamesLetters.length * 300);
}
