export default ({ IDL }) => {
    const CanisterImageInit = IDL.Record({
        'thumbnail' : IDL.Opt(IDL.Text),
        'metadata' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))),
        'code' : IDL.Text,
        'name' : IDL.Text,
        'repo' : IDL.Text,
        'description' : IDL.Text,
        'category' : IDL.Nat,
        'brief' : IDL.Text,
        'price' : IDL.Nat64,
    });
    const canister_id = IDL.Principal;
    const Result_3 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
    const Result = IDL.Variant({ 'ok' : canister_id, 'err' : IDL.Text });
    const CanisterSettings = IDL.Record({
        'freezing_threshold' : IDL.Nat,
        'controllers' : IDL.Vec(IDL.Principal),
        'memory_allocation' : IDL.Nat,
        'compute_allocation' : IDL.Nat,
    });
    const CanisterStatus = IDL.Record({
        'status' : IDL.Variant({
            'stopped' : IDL.Null,
            'stopping' : IDL.Null,
            'running' : IDL.Null,
        }),
        'freezing_threshold' : IDL.Nat,
        'memory_size' : IDL.Nat,
        'cycles' : IDL.Nat,
        'settings' : CanisterSettings,
        'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const CanisterInfo = IDL.Record({
        'status' : IDL.Nat,
        'canisterName' : IDL.Text,
        'owner' : IDL.Principal,
        'imageId' : IDL.Nat,
        'canisterId' : canister_id,
    });
    const CanisterStatusResponse = IDL.Record({
        'canister_status' : CanisterStatus,
        'canister_info' : CanisterInfo,
    });
    const Result_2 = IDL.Variant({
        'ok' : CanisterStatusResponse,
        'err' : IDL.Text,
    });
    const Time = IDL.Int;
    const CanisterHistory = IDL.Record({
        'maker' : IDL.Principal,
        'action' : IDL.Text,
        'time' : Time,
        'canisterId' : canister_id,
    });
    const HistoryResponse = IDL.Vec(IDL.Tuple(IDL.Nat, CanisterHistory));
    const CanisterResponse = IDL.Vec(IDL.Tuple(IDL.Nat, CanisterInfo));
    const CanisterImageCategory = IDL.Record({
        'status' : IDL.Nat,
        'name' : IDL.Text,
        'description' : IDL.Text,
    });
    const ImageCategoryResponse = IDL.Vec(
        IDL.Tuple(IDL.Nat, CanisterImageCategory)
    );
    const Balance = IDL.Record({ 'balance' : IDL.Nat, 'available' : IDL.Nat });
    const CanisterImageNoWasm = IDL.Record({
        'created' : Time,
        'creator' : IDL.Principal,
        'verified' : IDL.Bool,
        'thumbnail' : IDL.Opt(IDL.Text),
        'metadata' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))),
        'code' : IDL.Text,
        'name' : IDL.Text,
        'repo' : IDL.Text,
        'description' : IDL.Text,
        'approved' : IDL.Bool,
        'updated' : Time,
        'category' : IDL.Nat,
        'brief' : IDL.Text,
        'price' : IDL.Nat64,
    });
    const Result_1 = IDL.Variant({
        'ok' : CanisterImageNoWasm,
        'err' : IDL.Text,
    });
    const CanisterImageResponse = IDL.Vec(
        IDL.Tuple(IDL.Nat, CanisterImageNoWasm)
    );
    const Payment = IDL.Record({
        'to' : IDL.Principal,
        'from' : IDL.Principal,
        'time' : Time,
        'txId' : IDL.Nat,
        'amount' : IDL.Nat,
    });
    const anon_class_32_1 = IDL.Service({
        'add_canister_image' : IDL.Func([CanisterImageInit], [], []),
        'burnRate' : IDL.Func([], [IDL.Nat], ['query']),
        'control_canister' : IDL.Func(
            [canister_id, IDL.Text, IDL.Nat, IDL.Vec(IDL.Nat8)],
            [Result_3],
            [],
        ),
        'create_category' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
        'create_new_canister' : IDL.Func([IDL.Text], [Result], []),
        'cycles_withdraw' : IDL.Func([IDL.Principal, IDL.Nat], [], []),
        'delete_templates' : IDL.Func([IDL.Nat], [Result_3], []),
        'edit_canister_image' : IDL.Func(
            [IDL.Nat, CanisterImageInit],
            [Result_3],
            [],
        ),
        'getBalance' : IDL.Func([], [IDL.Nat], []),
        'get_admins' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        'get_canister' : IDL.Func([canister_id], [Result_2], []),
        'get_canister_history' : IDL.Func(
            [canister_id],
            [HistoryResponse],
            ['query'],
        ),
        'get_canisters' : IDL.Func([], [CanisterResponse], ['query']),
        'get_categories' : IDL.Func([], [ImageCategoryResponse], ['query']),
        'get_cycles' : IDL.Func([], [Balance], []),
        'get_image' : IDL.Func([IDL.Nat], [Result_1], ['query']),
        'get_images' : IDL.Func([], [CanisterImageResponse], ['query']),
        'makePayment' : IDL.Func([], [Result], []),
        'my_canister' : IDL.Func([], [CanisterResponse], []),
        'price' : IDL.Func([], [IDL.Nat], ['query']),
        'setBurnRate' : IDL.Func([IDL.Nat], [], []),
        'setPrice' : IDL.Func([IDL.Nat], [], []),
        'setSystemEnabled' : IDL.Func([IDL.Bool], [], []),
        'transactions' : IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, Payment))],
            ['query'],
        ),
        'upload' : IDL.Func([IDL.Vec(IDL.Vec(IDL.Nat8))], [], ['oneway']),
        'upload_clear' : IDL.Func([], [], ['oneway']),
        'wallet_receive' : IDL.Func([], [], []),
        'whoami' : IDL.Func([], [IDL.Principal], []),
    });
    return anon_class_32_1;
};
export const init = ({ IDL }) => { return []; };
