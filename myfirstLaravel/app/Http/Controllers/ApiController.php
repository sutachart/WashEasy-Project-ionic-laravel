<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ApiController extends Controller
{
    function test(){
    	$firebase = new \Geckob\Firebase\Firebase('../apiFirebase.json');
    	$temp = [];
    	$temp = $firebase->get('/getData');

            return response()->json(['status' => $temp,
                'message' => 'Gotcha!!!',
                'data' => $temp], 200);
    }

    public function insertUser(Request $request){
        $user_address = $request['order_address'];
        $user_price = $request['order_price'];
        $user_service = $request['order_service'];
        $user_latitude = $request['order_latitude'];
        $user_longtitude = $request['order_longtitude'];
        $tid = $request['order_tid'];

        $result = DB::table('user')->insert([
            'user_address' => $user_address,
            'user_price' => $user_price,
            'user_service' => $user_service,
            'user_latitude' => $user_latitude,
            'user_longtitude' => $user_longtitude,
            'tid' => $tid
        ]);
        return response()->json('success');
    }

    public function updateTransaction(Request $request){
        $status = $request['status'];

        $result = DB::table('transaction')->insert([
            'status' => $status
        ]);
        $tran = DB::table('transaction')
            ->select('tran_id')
            ->orderBy('tran_id', 'desc')
            ->get();
        
        return response()->json(['transaction'=>$tran]);
    }

    public function checkStatus(){
        $user_id = 25;
        $result = DB::table('transaction')
            ->select('transaction.status','user.tid','user.user_id')
            ->join('user','user.tid','=','transaction.tran_id')
            ->where('user.user_id','=',$user_id)
            ->orderBy('tid', 'desc')
            ->get();
    return response()->json(['status' => $result]);
    }

    public function getCallwash(){
        $result = DB::table('transaction')
            ->select('transaction.status','user.user_id','user.user_address','user.tid')
            ->join('user','user.tid','=','transaction.tran_id')
            ->where('status','=','0')
            ->get();
    return response()->json(['status' => $result]);
    }

    public function acceptCallwash(){
        $result = DB::table('transaction')
            ->select('transaction.status','user.user_id','user.user_address','user.tid')
            ->join('user','user.tid','=','transaction.tran_id')
            ->where('status','=','1')
            ->get();
    return response()->json(['status' => $result]);
    }

    public function insertTidWashman(Request $request){
        $tid = $request['tid'];
        $result = DB::table('washman')->insert([
            'tid' => $tid
        ]);
    }

    public function getAddress(Request $request){
        $tid = $request['tid'];
        $result = DB::table('user')
            ->select('user.user_service','user.user_price','user.user_address','user.user_latitude','user.user_longtitude','user.user_id')
            ->join('washman','user.tid','=','washman.tid')
            ->where('washman.tid','=', $tid)
            ->get();
    return response()->json(['status' => $result]);   
    }

    public function acceptRequest(Request $request){
        $tid = $request['tid'];
        $result = DB::table('transaction')
            ->where('tran_id','=',$tid)
            ->update(array('status' => 1));

    return response()->json(['success']);   
    }

    public function takeOrder(Request $request){
        $tid = $request['tid'];
        $result = DB::table('transaction')
            ->where('tran_id','=',$tid)
            ->update(array('status' => 2));

    return response()->json(['success']);   
    }

    public function sendOrder(){
        $result = DB::table('transaction')
            ->select('transaction.status','user.user_id','user.user_address','user.tid')
            ->join('user','user.tid','=','transaction.tran_id')
            ->where('status','=','2')
            ->get();
    return response()->json(['status' => $result]);
    }

    public function cancelRequest(Request $request){
        $tid = $request['tid'];
        $cancellation = $request['cancellation'];
        $result = DB::table('transaction')
            ->where('tran_id','=',$tid)
            ->update(array('status' => 'C','cancellation' => $cancellation));

    return response()->json(['Cancel complete']);   
    }

    public function getDetail(Request $request){
        $tid = $request['tid'];
        $result = DB::table('user')
            ->select('user.tid','user.user_id','user.user_address')
            ->join('transaction','user.tid','=','transaction.tran_id')
            ->where('user.tid','=',$tid)
            ->get();
    return response()->json(['status' => $result]);
    }

    public function sentOrder(Request $request){
        $tid = $request['tid'];
        $result = DB::table('transaction')
            ->where('tran_id','=',$tid)
            ->update(array('status' => 3));

    return response()->json(['success']);   
    }

     public function sentOrderFinish(Request $request){
        $tid = $request['tid'];
        $result = DB::table('transaction')
            ->where('tran_id','=',$tid)
            ->update(array('status' => 4));

    return response()->json(['success']);   
    }

    public function getAddressOrder(Request $request){
        $tid = $request['tid'];
        $result = DB::table('user')
            ->select('user.user_service','user.user_price','user.user_address','user.user_latitude','user.user_longtitude','user.user_id')
            ->join('transaction','user.tid','=','transaction.tran_id')
            ->where('user.tid','=', $tid)
            ->where('transaction.status','=',3)
            ->get();
    return response()->json(['status' => $result]);   
    }

    public function showOrderMap(){
        $result = DB::table('transaction')
            ->select('user.user_address','user.user_service','user.tid')
            ->join('user','user.tid','=','transaction.tran_id')
            ->where('status','=','3')
            ->get();
    return response()->json(['status' => $result]);
    }

    public  function loginWashman(Request $request){
        $username = $request['username'];
        $password = $request['password'];
         $result = DB::table('account')
            ->select('username','password')
            ->get();
    }
}
