export default ({ IDL }) => {
    const definite_canister_settings = IDL.Record({
        'freezing_threshold' : IDL.Nat,
        'controllers' : IDL.Vec(IDL.Principal),
        'memory_allocation' : IDL.Nat,
        'compute_allocation' : IDL.Nat,
    });
    const canister_status = IDL.Record({
        'status' : IDL.Variant({
            'stopped' : IDL.Null,
            'stopping' : IDL.Null,
            'running' : IDL.Null,
        }),
        'memory_size' : IDL.Nat,
        'cycles' : IDL.Nat,
        'settings' : definite_canister_settings,
        'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const ConfigRequest__1 = IDL.Record({
        'CREATION_FEE' : IDL.Opt(IDL.Nat),
        'ROUTING_FEE' : IDL.Opt(IDL.Nat),
        'DEFAULT_VOLATILITY_LIMIT' : IDL.Opt(IDL.Nat),
    });
    const TokenSymbol = IDL.Text;
    const TokenStd__1 = IDL.Variant({
        'dft' : IDL.Null,
        'ext' : IDL.Null,
        'icp' : IDL.Null,
        'other' : IDL.Text,
        'cycles' : IDL.Null,
        'ledger' : IDL.Null,
        'icrc1' : IDL.Null,
        'dip20' : IDL.Null,
        'drc20' : IDL.Null,
    });
    const TokenInfo = IDL.Tuple(IDL.Principal, TokenSymbol, TokenStd__1);
    const DexName__1 = IDL.Text;
    const PairRequest = IDL.Record({
        'token0' : TokenInfo,
        'token1' : TokenInfo,
        'dexName' : DexName__1,
    });
    const SwapCanister = IDL.Principal;
    const DRC207Support = IDL.Record({
        'timer' : IDL.Record({
            'interval_seconds' : IDL.Opt(IDL.Nat),
            'enable' : IDL.Bool,
        }),
        'monitorable_by_self' : IDL.Bool,
        'monitorable_by_blackhole' : IDL.Record({
            'canister_id' : IDL.Opt(IDL.Principal),
            'allowed' : IDL.Bool,
        }),
        'cycles_receivable' : IDL.Bool,
    });
    const DexName = IDL.Text;
    const Time = IDL.Int;
    const SwapCanister__1 = IDL.Principal;
    const SwapPair__1 = IDL.Record({
        'feeRate' : IDL.Float64,
        'token0' : TokenInfo,
        'token1' : TokenInfo,
        'dexName' : DexName__1,
        'canisterId' : SwapCanister__1,
    });
    const Amount = IDL.Nat;
    const Vol = IDL.Record({ 'value0' : Amount, 'value1' : Amount });
    const Shares = IDL.Nat;
    const Timestamp = IDL.Nat;
    const ShareWeighted = IDL.Record({
        'updateTime' : Timestamp,
        'shareTimeWeighted' : IDL.Nat,
    });
    const PriceWeighted = IDL.Record({
        'updateTime' : Timestamp,
        'token1TimeWeighted' : IDL.Nat,
        'token0TimeWeighted' : IDL.Nat,
    });
    const Liquidity = IDL.Record({
        'vol' : Vol,
        'shares' : Shares,
        'shareWeighted' : ShareWeighted,
        'unitValue' : IDL.Tuple(Amount, Amount),
        'value0' : Amount,
        'value1' : Amount,
        'priceWeighted' : PriceWeighted,
        'swapCount' : IDL.Nat64,
    });
    const ListingReferrer = IDL.Record({
        'end' : IDL.Opt(Time),
        'verified' : IDL.Bool,
        'referrer' : IDL.Principal,
        'name' : IDL.Text,
        'start' : Time,
        'nftId' : IDL.Text,
    });
    const PairResponse = IDL.Record({
        'pair' : SwapPair__1,
        'sponsored' : IDL.Bool,
        'liquidity' : IDL.Opt(Liquidity),
        'score' : IDL.Nat,
        'listingReferrers' : IDL.Vec(IDL.Tuple(ListingReferrer, Time)),
    });
    const TrieList_4 = IDL.Record({
        'total' : IDL.Nat,
        'data' : IDL.Vec(
            IDL.Tuple(
                SwapCanister,
                IDL.Record({
                    'end' : Time,
                    'name' : IDL.Text,
                    'pair' : PairResponse,
                    'start' : Time,
                    'round' : IDL.Nat,
                }),
            )
        ),
        'totalPage' : IDL.Nat,
    });
    const Config__1 = IDL.Record({
        'CREATION_FEE' : IDL.Nat,
        'SYS_TOKEN' : IDL.Principal,
        'ROUTING_FEE' : IDL.Nat,
        'DEFAULT_VOLATILITY_LIMIT' : IDL.Nat,
    });
    const TokenInfo__1 = IDL.Tuple(IDL.Principal, TokenSymbol, TokenStd__1);
    const DexCompetitionResponse = IDL.Record({
        'end' : Time,
        'content' : IDL.Text,
        'name' : IDL.Text,
        'start' : Time,
        'pairs' : IDL.Vec(
            IDL.Tuple(
                DexName__1,
                SwapPair__1,
                IDL.Variant({ 'token0' : IDL.Null, 'token1' : IDL.Null }),
            )
        ),
        'hostedDex' : DexName__1,
    });
    const Address = IDL.Text;
    const BalanceChange = IDL.Variant({
        'DebitRecord' : IDL.Nat,
        'CreditRecord' : IDL.Nat,
        'NoChange' : IDL.Null,
    });
    const Txid = IDL.Vec(IDL.Nat8);
    const FilledTrade = IDL.Record({
        'time' : Time,
        'token0Value' : BalanceChange,
        'counterparty' : Txid,
        'token1Value' : BalanceChange,
    });
    const TraderStats = IDL.Record({
        'pnl' : IDL.Float64,
        'vol' : IDL.Nat,
        'trades' : IDL.Vec(FilledTrade),
        'count' : IDL.Nat,
        'time' : Time,
        'avgPrice' : IDL.Float64,
        'capital' : IDL.Float64,
        'position' : IDL.Int,
    });
    const TraderData = IDL.Record({
        'startTime' : Time,
        'total' : IDL.Opt(IDL.Tuple(TraderStats, IDL.Float64)),
        'endTime' : IDL.Opt(Time),
        'data' : IDL.Vec(TraderStats),
        'pair' : SwapCanister__1,
        'dexName' : DexName__1,
        'quoteToken' : IDL.Variant({ 'token0' : IDL.Null, 'token1' : IDL.Null }),
    });
    const AccountId = IDL.Vec(IDL.Nat8);
    const TraderDataResponse = IDL.Record({
        'startTime' : Time,
        'total' : IDL.Opt(IDL.Tuple(TraderStats, IDL.Float64)),
        'endTime' : IDL.Opt(Time),
        'data' : IDL.Vec(TraderStats),
        'pair' : SwapPair__1,
        'quoteToken' : IDL.Variant({ 'token0' : IDL.Null, 'token1' : IDL.Null }),
    });
    const TrieList_3 = IDL.Record({
        'total' : IDL.Nat,
        'data' : IDL.Vec(IDL.Tuple(AccountId, IDL.Vec(TraderDataResponse))),
        'totalPage' : IDL.Nat,
    });
    const TrieList_2 = IDL.Record({
        'total' : IDL.Nat,
        'data' : IDL.Vec(IDL.Tuple(IDL.Nat, DexCompetitionResponse)),
        'totalPage' : IDL.Nat,
    });
    const ListingReferrer__1 = IDL.Record({
        'end' : IDL.Opt(Time),
        'verified' : IDL.Bool,
        'referrer' : IDL.Principal,
        'name' : IDL.Text,
        'start' : Time,
        'nftId' : IDL.Text,
    });
    const SwapPair = IDL.Record({
        'feeRate' : IDL.Float64,
        'token0' : TokenInfo,
        'token1' : TokenInfo,
        'dexName' : DexName__1,
        'canisterId' : SwapCanister__1,
    });
    const TrieList_1 = IDL.Record({
        'total' : IDL.Nat,
        'data' : IDL.Vec(IDL.Tuple(SwapCanister, IDL.Tuple(SwapPair, IDL.Nat))),
        'totalPage' : IDL.Nat,
    });
    const TrieList = IDL.Record({
        'total' : IDL.Nat,
        'data' : IDL.Vec(IDL.Tuple(SwapCanister, PairResponse)),
        'totalPage' : IDL.Nat,
    });
    const ConfigRequest = IDL.Record({
        'FEE' : IDL.Opt(IDL.Nat),
        'RETENTION_RATE' : IDL.Opt(IDL.Nat),
        'TOKEN0_LIMIT' : IDL.Opt(IDL.Nat),
        'MAX_VOLATILITY' : IDL.Opt(IDL.Nat),
        'TOKEN1_LIMIT' : IDL.Opt(IDL.Nat),
        'ICP_FEE' : IDL.Opt(IDL.Nat),
    });
    const Config = IDL.Record({
        'MAX_STORAGE_TRIES' : IDL.Opt(IDL.Nat),
        'EN_DEBUG' : IDL.Opt(IDL.Bool),
        'MAX_CACHE_NUMBER_PER' : IDL.Opt(IDL.Nat),
        'MAX_CACHE_TIME' : IDL.Opt(IDL.Nat),
    });
    const TokenStd = IDL.Variant({
        'dft' : IDL.Null,
        'ext' : IDL.Null,
        'icp' : IDL.Null,
        'other' : IDL.Text,
        'cycles' : IDL.Null,
        'ledger' : IDL.Null,
        'icrc1' : IDL.Null,
        'dip20' : IDL.Null,
        'drc20' : IDL.Null,
    });
    return IDL.Service({
        'canister_status' : IDL.Func([], [canister_status], []),
        'changeOwner' : IDL.Func([IDL.Principal], [IDL.Bool], []),
        'config' : IDL.Func([ConfigRequest__1], [IDL.Bool], []),
        'create' : IDL.Func([PairRequest], [SwapCanister, IDL.Bool], []),
        'debug_fetchCompData' : IDL.Func([IDL.Opt(IDL.Nat)], [], []),
        'delDex' : IDL.Func([IDL.Principal], [], []),
        'drc207' : IDL.Func([], [DRC207Support], ['query']),
        'dropListingReferrer' : IDL.Func([IDL.Principal], [], []),
        'getCompetitions' : IDL.Func(
            [IDL.Opt(DexName), IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
            [TrieList_4],
            ['query'],
        ),
        'getConfig' : IDL.Func([], [Config__1], ['query']),
        'getCurrencies' : IDL.Func([], [IDL.Vec(TokenInfo__1)], ['query']),
        'getDexCompetition' : IDL.Func(
            [IDL.Nat],
            [IDL.Opt(DexCompetitionResponse)],
            ['query'],
        ),
        'getDexCompetitionRound' : IDL.Func([], [IDL.Nat], ['query']),
        'getDexCompetitionTrader' : IDL.Func(
            [IDL.Nat, Address],
            [IDL.Opt(IDL.Vec(TraderData))],
            ['query'],
        ),
        'getDexCompetitionTraders' : IDL.Func(
            [IDL.Nat, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
            [TrieList_3],
            ['query'],
        ),
        'getDexCompetitions' : IDL.Func(
            [IDL.Opt(DexName), IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
            [TrieList_2],
            ['query'],
        ),
        'getDexList' : IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(DexName, IDL.Principal))],
            ['query'],
        ),
        'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
        'getPairListingReferrers' : IDL.Func(
            [SwapCanister],
            [IDL.Bool, IDL.Vec(IDL.Tuple(ListingReferrer__1, Time))],
            ['query'],
        ),
        'getPairs' : IDL.Func(
            [IDL.Opt(DexName), IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
            [TrieList_1],
            ['query'],
        ),
        'getPairs2' : IDL.Func(
            [
                IDL.Opt(DexName),
                IDL.Opt(IDL.Principal),
                IDL.Opt(IDL.Nat),
                IDL.Opt(IDL.Nat),
            ],
            [TrieList],
            ['query'],
        ),
        'getPairsByToken' : IDL.Func(
            [IDL.Principal, IDL.Opt(DexName)],
            [IDL.Vec(IDL.Tuple(SwapCanister, IDL.Tuple(SwapPair, IDL.Nat)))],
            ['query'],
        ),
        'getTokens' : IDL.Func(
            [IDL.Opt(DexName)],
            [IDL.Vec(TokenInfo__1)],
            ['query'],
        ),
        'getWasmVersion' : IDL.Func([], [IDL.Text, IDL.Text, IDL.Nat], ['query']),
        'listingReferrer' : IDL.Func(
            [IDL.Principal],
            [IDL.Bool, IDL.Bool],
            ['query'],
        ),
        'monitor' : IDL.Func([], [], []),
        'pair_changeOwner' : IDL.Func(
            [IDL.Principal, IDL.Principal],
            [IDL.Bool],
            [],
        ),
        'pair_compNewRound' : IDL.Func(
            [
                IDL.Principal,
                IDL.Text,
                IDL.Text,
                Time,
                Time,
                IDL.Variant({ 'token0' : IDL.Null, 'token1' : IDL.Null }),
                IDL.Bool,
            ],
            [IDL.Nat],
            [],
        ),
        'pair_config' : IDL.Func(
            [IDL.Principal, IDL.Opt(ConfigRequest), IDL.Opt(Config)],
            [IDL.Bool],
            [],
        ),
        'pair_ictcSetAdmin' : IDL.Func(
            [IDL.Principal, IDL.Principal, IDL.Bool],
            [IDL.Bool],
            [],
        ),
        'pair_pause' : IDL.Func([IDL.Principal, IDL.Bool], [IDL.Bool], []),
        'pair_taSetDescription' : IDL.Func([IDL.Principal, IDL.Text], [], []),
        'propose' : IDL.Func([SwapCanister], [], []),
        'pushCompetitionByDex' : IDL.Func(
            [
                IDL.Opt(IDL.Nat),
                IDL.Text,
                IDL.Text,
                Time,
                Time,
                IDL.Vec(
                    IDL.Tuple(
                        DexName,
                        IDL.Principal,
                        IDL.Variant({ 'token0' : IDL.Null, 'token1' : IDL.Null }),
                    )
                ),
            ],
            [IDL.Nat],
            [],
        ),
        'pushCompetitionByPair' : IDL.Func([IDL.Nat, IDL.Text, Time, Time], [], []),
        'put' : IDL.Func([SwapPair, IDL.Nat], [], []),
        'putByDex' : IDL.Func([TokenInfo__1, TokenInfo__1, IDL.Principal], [], []),
        'putCurrency' : IDL.Func([TokenInfo__1], [], []),
        'registerDexCompetition' : IDL.Func(
            [IDL.Opt(IDL.Vec(IDL.Nat8))],
            [IDL.Bool],
            [],
        ),
        'remove' : IDL.Func([IDL.Principal], [], []),
        'removeByDex' : IDL.Func([IDL.Principal], [], []),
        'removeCurrency' : IDL.Func([IDL.Principal], [], []),
        'route' : IDL.Func(
            [IDL.Principal, IDL.Principal, IDL.Opt(DexName)],
            [IDL.Vec(IDL.Tuple(SwapCanister, IDL.Tuple(SwapPair, IDL.Nat)))],
            ['query'],
        ),
        'setDex' : IDL.Func([DexName, IDL.Principal], [], []),
        'setListingReferrer' : IDL.Func(
            [IDL.Principal, IDL.Text, IDL.Bool],
            [],
            [],
        ),
        'setListingReferrerByNft' : IDL.Func(
            [IDL.Principal, IDL.Text, IDL.Text, IDL.Text],
            [],
            [],
        ),
        'setScore' : IDL.Func([IDL.Principal, IDL.Nat], [], []),
        'setWasm' : IDL.Func([IDL.Vec(IDL.Nat8), IDL.Text, IDL.Bool], [], []),
        'sync' : IDL.Func([], [], []),
        'sys_burn' : IDL.Func([IDL.Nat], [], []),
        'sys_order' : IDL.Func(
            [IDL.Principal, TokenStd, IDL.Nat, IDL.Principal],
            [],
            [],
        ),
        'sys_withdraw' : IDL.Func(
            [IDL.Principal, TokenStd, IDL.Principal, IDL.Nat],
            [],
            [],
        ),
        'timerStart' : IDL.Func([IDL.Nat], [], []),
        'timerStop' : IDL.Func([], [], []),
        'update' : IDL.Func([IDL.Principal], [IDL.Opt(SwapCanister)], []),
        'wallet_receive' : IDL.Func([], [], []),
    });
};
export const init = ({ IDL }) => { return []; };