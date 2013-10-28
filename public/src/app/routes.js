define(function() {
  'use strict';

  // The routes for the application. This module returns a function.
  // `match` is match method of the Router
  return function(match) {
    match('', 'pages#home');
    match('pages/:slug', 'pages#show');

    match('signout', 'sessions#signout');

    match('404', 'errors#404');
    match('403', 'errors#403');
    match('500', 'errors#500');
  };
});