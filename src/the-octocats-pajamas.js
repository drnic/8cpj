function _8cpj_sort_by(sort_funk) {
  var list = [];
  $("#repo_listing li.public").each(function(i, li) {
    var node = $("b", li);
    var name = node.text().replace(/^\s+|\s+$/g,"");
    list.push([li, name]);
    $(li).remove();
  });

  list = list.sort(function(a, b) {
    var repoA = _8cpj_repos[a[1]];
    var repoB = _8cpj_repos[b[1]];
    return sort_funk(repoA, repoB);
  });

  var ul = $('#repo_listing')
  $.each(list, function(i, li) {
    ul.append(li[0]);
  });
}

function _8cpj_by_commit() {
  _8cpj_sort_by(function(a, b) {
    return b.last_commit - a.last_commit;
  });
}

function _8cpj_by_issues() {
  _8cpj_sort_by(function(a, b) {
    var alen = a.issues ? a.issues.length : 0;
    var blen = b.issues ? b.issues.length : 0;
    return blen - alen;
  });
}

function _8cpj_by_watchers() {
  _8cpj_sort_by(function(a, b) {
    return b.watchers - a.watchers;
  });
}

function _8cpj_by_forks() {
  _8cpj_sort_by(function(a, b) {
    return b.forks - a.forks;
  });
}

function _8cpj_completed() {
}

$("#repo-sorts").html("Sort by: <a href='javascript:_8cpj_by_commit();'>last commit</a>, " +
  "<a href='javascript:_8cpj_by_issues();'>issues</a>, " +
  "<a href='javascript:_8cpj_by_forks();'>forks</a>, "+
  "<a href='javascript:_8cpj_by_watchers();'>watchers</a>");

if (_8cpj_version != '1.1') {
  $("#repo-sorts").prepend("<div id='update8cpj'><strong>Hey!</strong> <a href='http://whytheluckystiff.net/greasy/the-octocats-pajamas.user.js'>An update</a> for The Octocat's Pajamas (1.2)</div>");
}
