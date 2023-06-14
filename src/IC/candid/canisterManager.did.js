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
    const Result_5 = IDL.Variant({ 'ok' : canister_id, 'err' : IDL.Text });
    const Time = IDL.Int;
    const CyclesTransaction = IDL.Record({
        'to' : IDL.Principal,
        'method' : IDL.Nat,
        'from' : IDL.Principal,
        'time' : Time,
        'amount' : IDL.Nat,
    });
    const DepositPing = IDL.Record({
        'to_account' : IDL.Text,
        'from_account' : IDL.Text,
        'amount' : IDL.Nat64,
    });
    const Result_4 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
    const CanisterInfo = IDL.Record({
        'status' : IDL.Nat,
        'created' : Time,
        'canisterName' : IDL.Text,
        'canisterType' : IDL.Nat,
        'owner' : IDL.Principal,
        'cycles' : IDL.Nat,
        'cycles_updated' : Time,
        'updated' : Time,
        'imageId' : IDL.Nat,
        'canisterId' : canister_id,
    });
    const Result_2 = IDL.Variant({ 'ok' : CanisterInfo, 'err' : IDL.Text });
    const CanisterHistory = IDL.Record({
        'maker' : IDL.Principal,
        'action' : IDL.Text,
        'canisterName' : IDL.Text,
        'imageName' : IDL.Text,
        'time' : Time,
        'canisterId' : canister_id,
    });
    const HistoryResponse = IDL.Vec(IDL.Tuple(IDL.Nat, CanisterHistory));
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
    const Result_1 = IDL.Variant({ 'ok' : CanisterStatus, 'err' : IDL.Text });
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
    const DepositTransaction = IDL.Record({
        'status' : IDL.Nat,
        'from' : IDL.Principal,
        'created_at' : Time,
        'to_account' : IDL.Text,
        'cycles' : IDL.Nat,
        'from_account' : IDL.Text,
        'completed_at' : Time,
        'amount' : IDL.Nat64,
        'block_height' : IDL.Nat,
    });
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
    const Result = IDL.Variant({ 'ok' : CanisterImageNoWasm, 'err' : IDL.Text });
    const CanisterImageResponse = IDL.Vec(
        IDL.Tuple(IDL.Nat, CanisterImageNoWasm)
    );
    const ImageMapping = IDL.Record({ 'code' : IDL.Text, 'name' : IDL.Text });
    const CanisterImageMapping = IDL.Vec(IDL.Tuple(IDL.Nat, ImageMapping));
    const UserInfo = IDL.Record({
        'id' : IDL.Principal,
        'bio' : IDL.Text,
        'title' : IDL.Text,
        'updated_at' : Time,
        'verified' : IDL.Bool,
        'username' : IDL.Text,
        'created_at' : Time,
        'links' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))),
        'cycle_balance' : IDL.Nat,
        'account' : IDL.Text,
    });
    const Payment = IDL.Record({
        'to' : IDL.Principal,
        'from' : IDL.Principal,
        'time' : Time,
        'txId' : IDL.Nat,
        'amount' : IDL.Nat,
    });
    const anon_class_37_1 = IDL.Service({
        'add_canister_image' : IDL.Func([CanisterImageInit], [], []),
        'burnRate' : IDL.Func([], [IDL.Nat], ['query']),
        'canister_action' : IDL.Func([canister_id, IDL.Text], [Result_3], []),
        'canister_control' : IDL.Func(
            [canister_id, IDL.Text, IDL.Text, IDL.Nat, IDL.Vec(IDL.Nat8)],
            [Result_3],
            [],
        ),
        'create_category' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
        'create_new_canister' : IDL.Func([IDL.Text], [Result_5], []),
        'cycles_history' : IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, CyclesTransaction))],
            ['query'],
        ),
        'cycles_withdraw' : IDL.Func([IDL.Principal, IDL.Nat], [], []),
        'delete_templates' : IDL.Func([IDL.Nat], [Result_3], []),
        'deposit_ping' : IDL.Func([DepositPing], [Result_4], []),
        'deposit_process' : IDL.Func([IDL.Nat], [Result_4], []),
        'edit_canister_image' : IDL.Func(
            [IDL.Nat, CanisterImageInit],
            [Result_3],
            [],
        ),
        'get_admins' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        'get_canister' : IDL.Func([canister_id], [Result_2], ['query']),
        'get_canister_history' : IDL.Func(
            [canister_id],
            [HistoryResponse],
            ['query'],
        ),
        'get_canister_status' : IDL.Func([canister_id], [Result_1], []),
        'get_canisters' : IDL.Func([], [CanisterResponse], ['query']),
        'get_categories' : IDL.Func([], [ImageCategoryResponse], ['query']),
        'get_cycles' : IDL.Func([], [Balance], []),
        'get_deposits' : IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, DepositTransaction))],
            ['query'],
        ),
        'get_image' : IDL.Func([IDL.Nat], [Result], ['query']),
        'get_images' : IDL.Func([], [CanisterImageResponse], ['query']),
        'get_images_list' : IDL.Func([], [CanisterImageMapping], ['query']),
        'get_logs' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
        'get_users' : IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Principal, UserInfo))],
            ['query'],
        ),
        'me' : IDL.Func([], [UserInfo], ['query']),
        'my_canister' : IDL.Func([], [CanisterResponse], ['query']),
        'my_deposits' : IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, DepositTransaction))],
            ['query'],
        ),
        'price' : IDL.Func([], [IDL.Nat], ['query']),
        'setBurnRate' : IDL.Func([IDL.Nat], [], []),
        'setInitCycles' : IDL.Func([IDL.Nat], [], []),
        'setLimitCanister' : IDL.Func([IDL.Nat], [], []),
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
    return anon_class_37_1;
};
export const init = ({ IDL }) => { return []; };
