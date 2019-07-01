<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('getAddress',array('middleware' => 'cors','uses' => 'ApiController@getAddress'));

Route::post('insertUser',array('middleware' => 'cors','uses' => 'ApiController@insertUser'));
Route::post('updateTransaction',array('middleware' => 'cors','uses' => 'ApiController@updateTransaction'));
Route::post('checkStatus',array('middleware' => 'cors','uses' => 'ApiController@checkStatus'));
Route::post('getCallwash',array('middleware' => 'cors','uses' => 'ApiController@getCallwash'));
Route::post('insertTidWashman',array('middleware' => 'cors','uses' => 'ApiController@insertTidWashman'));




