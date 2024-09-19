function sim_distance(prefs, person1, person2) {
  let si = {};
  for (let item in prefs[person1]) {
    if (prefs[person2][item]) si[item] = 1;
  }
  if (Object.keys(si).length === 0) return 0;
  let sum_of_squares = Object.keys(si).reduce((acc, cur) => {
    return acc + Math.pow(prefs[person1][cur] - prefs[person2][cur], 2);
  }, 0);
  return 1 / (1 + sum_of_squares);
}

function sim_pearson(prefs, p1, p2) {
  let si = {};
  for (let item in prefs[p1]) {
    if (prefs[p2][item]) si[item] = 1;
  }
  let n = Object.keys(si).length;
  if (n === 0) return 0;
  let sum1 = Object.keys(si).reduce((acc, cur) => acc + prefs[p1][cur], 0);
  let sum2 = Object.keys(si).reduce((acc, cur) => acc + prefs[p2][cur], 0);
  let sum1Sq = Object.keys(si).reduce((acc, cur) => acc + Math.pow(prefs[p1][cur], 2), 0);
  let sum2Sq = Object.keys(si).reduce((acc, cur) => acc + Math.pow(prefs[p2][cur], 2), 0);
  let pSum = Object.keys(si).reduce((acc, cur) => acc + prefs[p1][cur] * prefs[p2][cur], 0);
  let num = pSum - (sum1 * sum2 / n);
  let den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n));
  if (den === 0) return 0;
  return num / den;
}

function topMatches(prefs, person, n = 5, similarity = sim_pearson) {
  let scores = [];
  for (let other in prefs) {
    if (other !== person) {
      scores.push([other, similarity(prefs, person, other)]);
    }
  }
  scores.sort((a, b) => b[1] - a[1]);
  return scores.slice(0, n);
}

function getRecommendations(prefs, person, similarity = sim_pearson) {
  let totals = {};
  let simSums = {};
  for (let other in prefs) {
    if (other === person) continue;
    let sim = similarity(prefs, person, other);
    if (sim <= 0) continue;
    for (let item in prefs[other]) {
      if (!(item in prefs[person]) || prefs[person][item] === 0) {
        totals[item] = totals[item] || 0;
        totals[item] += prefs[other][item] * sim;
        simSums[item] = simSums[item] || 0;
        simSums[item] += sim;
      }
    }
  }
  let rankings = Object.keys(totals).map(item => [item, totals[item] / simSums[item]]);
  // @ts-ignore
  rankings.sort((a, b) => b[1] - a[1]);
  return rankings;
}

function transformPrefs(prefs) {
  let result = {};
  for (let person in prefs) {
    for (let item in prefs[person]) {
      result[item] = result[item] || {};
      result[item][person] = prefs[person][item];
    }
  }
  return result;
}

function calculateSimilarItems(prefs, n = 10) {
  let result = {};
  let itemPrefs = transformPrefs(prefs);
  let c = 0;
  for (let item in itemPrefs) {
    c++;
    if (c % 100 === 0) console.log(`${c} / ${Object.keys(itemPrefs).length}`);
    let scores = topMatches(itemPrefs, item, n, sim_distance);
    result[item] = scores;
  }
  return result;
}