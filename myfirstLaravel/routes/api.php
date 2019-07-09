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


Route::post('getTimeFirebase',array('middleware' => 'cors','uses' => 'ApiController@getTimeFirebase'));
Route::get('loginWashman',array('middleware' => 'cors','uses' => 'ApiController@loginWashman'));
Route::get('updateTimeFirebase',array('middleware' => 'cors','uses' => 'ApiController@updateTimeFirebase'));

Route::post('getAddress',array('middleware' => 'cors','uses' => 'ApiController@getAddress'));
Route::post('insertUser',array('middleware' => 'cors','uses' => 'ApiController@insertUser'));
Route::post('updateTransaction',array('middleware' => 'cors','uses' => 'ApiController@updateTransaction'));
Route::post('checkStatus',array('middleware' => 'cors','uses' => 'ApiController@checkStatus'));
Route::post('getCallwash',array('middleware' => 'cors','uses' => 'ApiController@getCallwash'));
Route::post('acceptCallwash',array('middleware' => 'cors','uses' => 'ApiController@acceptCallwash'));
Route::post('insertTidWashman',array('middleware' => 'cors','uses' => 'ApiController@insertTidWashman'));
Route::post('acceptRequest',array('middleware' => 'cors','uses' => 'ApiController@acceptRequest'));
Route::post('cancelRequest',array('middleware' => 'cors','uses' => 'ApiController@cancelRequest'));
Route::post('takeOrder',array('middleware' => 'cors','uses' => 'ApiController@takeOrder'));
Route::post('sendOrder',array('middleware' => 'cors','uses' => 'ApiController@sendOrder'));
Route::post('getDetail',array('middleware' => 'cors','uses' => 'ApiController@getDetail'));
Route::post('sentOrder',array('middleware' => 'cors','uses' => 'ApiController@sentOrder'));
Route::post('getAddressOrder',array('middleware' => 'cors','uses' => 'ApiController@getAddressOrder'));
Route::post('showOrderMap',array('middleware' => 'cors','uses' => 'ApiController@showOrderMap'));
Route::post('sentOrderFinish',array('middleware' => 'cors','uses' => 'ApiController@sentOrderFinish'));
Route::post('updateRating',array('middleware' => 'cors','uses' => 'ApiController@updateRating'));


